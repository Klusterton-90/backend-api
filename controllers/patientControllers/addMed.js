import Medication from '../../models/Medication.js'
import pushNotification from '../../middlewares/pushNotification.js'
import cron from 'node-cron'

const addMed = async (req, res) => {
    try {
        const {userId} = req.params;
        const {type, medicine, diagnosis, description, frequency, duration, reminders} = req.body;
        const newMed = {
            type: type,
            medicine: medicine,
            diagnosis: diagnosis,
            description: description,
            frequency: frequency,
            duration: duration,
            reminders: reminders,
            UserId: userId
        }

        await Medication.create(newMed);

        const createdAt = new Date(Date.now());
        const hour = createdAt.getHours()
        const message = "Hi! It's time to take your medications"

        const task = cron.schedule(`0 ${hour} * * *`, () => {
            pushNotification(reminders, message );
          });
        task.start();
        setTimeout(() => {
            task.stop()
        }, duration*24*60*60*1000)
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            err: error.message,
        });
    }
}

export default addMed;