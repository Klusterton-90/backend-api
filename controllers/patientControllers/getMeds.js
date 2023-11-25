import Medication from '../../models/Medication.js'

const getMeds = async (res, req) => {
    try {
        const { userId } = req.params
        const medications = await Medication.findAll({where: {UserId: userId}});
        res.status(200).json({
            status: 200,
            id: id,
            data: medications
        })

      } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            err: error.message
            })
      }
}
 
export default getMeds;