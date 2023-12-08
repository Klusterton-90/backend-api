import OneSignal from 'onesignal-node';

const client = new OneSignal.Client({
  apiKey: process.env.APIKEY,
  appId: process.env.APPID,
});

const pushNotification = async (patientReminders , message) => {
  try {
    const notification = new OneSignal.Notification({
        contents: {
          en: message,
        },
      });

      const reminders = patientReminders || [];

      for (const reminderTime of reminders) {
        // Schedule push notification for each reminder time
        const scheduledTime = new Date();
        scheduledTime.setHours(reminderTime.getHours());
        scheduledTime.setMinutes(reminderTime.getMinutes());

        notification.sendAfter = scheduledTime;
        const response = await client.createNotification(notification);
    }
     res.status(200).json({
            status: 200,
            message: "Notifications sent successfully"
    })
        
  } catch (error) {
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        err: error.message
        })
  }
};

export default pushNotification;

