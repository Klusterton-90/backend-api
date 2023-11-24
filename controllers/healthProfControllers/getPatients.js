import User from "../../models/User";
import HealthProfessional from "../../models/HealthProfessional";

const getPatients = async (req, res) => {
  try {
    const healthproviderId = req.params.healthproviderId;

    const healthprovider = await HealthProfessional.findByPk(healthproviderId, {
      include: [{ model: User }],
    });

    const patients = healthprovider.Patients;
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getPatients;
