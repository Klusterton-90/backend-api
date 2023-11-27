import Adherence from "../../models/Adherence.js";
import User from "../../models/User.js";

const getAllAdherence = async (req, res) => {
  const { healthProfId } = req.params;
  try {
    const patients = await User.findAll({where: { HealthProfessionalId : healthProfId }})
    const adherenceData = await Adherence.findAll({
      where: { UserId: patients.map(patient => patient.id) },
    });

    res.status(200).json({
      status: 200,
      data: adherenceData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

export default getAllAdherence;
