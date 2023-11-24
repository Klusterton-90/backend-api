import Medication from '../../models/Medication.js'

const getMed = async (res, req) => {
    try {
        const { id } = req.params
        const medication = await Medication.findByPk(id);
        res.status(200).json({
            status: 200,
            data: medication
        })

      } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            err: error.message
            })
      }
}
 
export default getMed;