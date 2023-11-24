import User from "../../models/User.js";
import HealthProfessional from "../../models/HealthProfessional.js";

const getPatients = async function (req, res) {
  try {
    const healthproviderId = req.params.healthproviderId;

    const patients = await User.findAll(
      {where: {HealthProfessionalId: healthproviderId},
      attributes: ['id', 'name', 'phoneNumber', 'email'],},
      );

    res.status(200).json({
      id: healthproviderId,
      data: patients });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getPatients;
