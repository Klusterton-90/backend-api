import Medication from '../../models/Medication.js'


const updateMed = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = await Medication.update(req.body, {
          where: { id: id },
        });
        res.status(200).json({
            status: 200,
            id: id,
            data: updatedData
        })
      } catch (error) {
          res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            err: error.message
            })
      }
}

export default updateMed;