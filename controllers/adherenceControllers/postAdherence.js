import Adherence from "../../models/Adherence.js";

const addAdherence = async (req, res) => {
  try {
    const {userId} = req.params
    const { timestamp, medicationId, adherenceStatus, notes } = req.body;

    const newAdherence = {
      timestamp: timestamp,
      UserId: userId,
      MedicationId: medicationId,
      adherenceStatus: adherenceStatus,
      notes: notes,
    };

    await Adherence.create(newAdherence);
    res.status(200).json({
      status: 200,
      message: "Adherence recorded successfully"
})
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

export default addAdherence;
