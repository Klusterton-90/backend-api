import Medication from '../../models/Medication.js'


const updateMed = async (res, req) => {
    try {
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