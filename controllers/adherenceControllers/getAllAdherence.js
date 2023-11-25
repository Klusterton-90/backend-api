import Adherence from "../../models/Adherence";

const getAllAdherence = async (req, res) => {
  const { healthProfId } = req.params;
  try {
    const allAdherence = await Adherence.findAll({
      where: { HealthProfId: healthProfId },
    });

    res.status(200).json({
      data: allAdherence,
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
