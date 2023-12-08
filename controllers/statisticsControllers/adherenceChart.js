import User from "../../models/User.js";
import HealthProfessional from "../../models/HealthProfessional.js";
import Adherence from "../../models/Adherence.js";
import Medication from "../../models/Medication.js";

const adherenceChart = async (req, res) => {
    try {
        const firstQueryResult = await Adherence.findAll({
            attributes: [
              [Sequelize.fn('to_char', Sequelize.col('timestamp'), 'Day'), 'day_of_week'],
              [Sequelize.fn('COUNT', Sequelize.literal('*')), 'total_records'],
              [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "Adherence"."adherenceStatus" = \'Taken\' THEN 1 END')), 'taken_count'],
              [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "Adherence"."adherenceStatus" = \'Missed\' THEN 1 END')), 'missed_count'],
              [
                Sequelize.literal('(COUNT(CASE WHEN "Adherence"."adherenceStatus" = \'Taken\' THEN 1 END) * 100.0 / COUNT(*))'),
                'adherence_rate'
              ],
            ],
            include: [
              {
                model: User,
                include: [
                  {
                    model: HealthProfessional,
                    where: { name: req.user.name }, 
                  },
                ],
              },
            ],
            group: ['day_of_week'],
            order: [['day_of_week']],
          });
          
        const secondQueryResult = await Adherence.findOne({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "adherenceStatus" = \'Taken\' THEN 1 END')), 'taken_count'],
              [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "adherenceStatus" = \'Missed\' THEN 1 END')), 'missed_count'],
              [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "adherenceStatus" = \'Late\' THEN 1 END')), 'late_count'],
            ],
            include: [
              {
                model: User,
                include: [
                  {
                    model: HealthProfessional,
                    where: { name: req.user.name },
                  },
                ],
              },
            ],
          });
          
          const thirdQueryResult = await Medication.findAll({
            attributes: [
              ['type', 'medication_type'],
              [Sequelize.fn('COUNT', Sequelize.col('Adherence.id')), 'adherence_count'],
            ],
            include: [
              {
                model: Adherence,
                include: [
                  {
                    model: User,
                    include: [
                      {
                        model: HealthProfessional,
                        where: { name: req.user.name }, 
                      },
                    ],
                  },
                ],
              },
            ],
            group: ['Medication.type'],
          });
          
        const chartData = {
            adherenceChart: firstQueryResult,
            overallDistribution: secondQueryResult[0],
            medicationAdherence: thirdQueryResult,
        };
      
        res.status(200).json({
            chartData
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
            message: error.message
         });
    }
}

export default adherenceChart