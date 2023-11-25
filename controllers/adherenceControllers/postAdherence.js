import Adherence from "../../models/Adherence";

const addAdherence = async (req, res) => {
  try {
    const { timestamp, userId, medicationId, status, notes } = req.body;

    const newAdherence = {
      timestamp: timestamp,
      userId: userId,
      medicationId: medicationId,
      status: status,
      notes: notes,
    };

    await Adherence.create(newAdherence);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

export default addAdherence;
