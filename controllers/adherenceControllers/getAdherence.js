import Adherence from "../../models/Adherence.js";

const getAdherence = async (req, res) => {
  const { userId } = req.params;
  try {
    const adherenceByPatient = await Adherence.findAll({
      where: { UserId: userId },
    });
    res.status(200).json({
      status: 200,
      data: adherenceByPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

export default getAdherence;
