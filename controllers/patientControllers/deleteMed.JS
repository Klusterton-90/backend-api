import Medication from '../../models/Medication.js'

const deleteMed = async (res, req) => {
    try {
        const { id } = req.params
        const rowDeleted = await Medication.destroy({
          where: { id: id },
        });
    
        res.status(200).json({
            status: 200,
            message: "Reminder deleted successfully"
        })
      } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            err: error.message
            })
      }
}
 
export default deleteMed;