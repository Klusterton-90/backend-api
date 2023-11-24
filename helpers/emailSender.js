import createTransporter from './createTransport.js'

async function sendEmail(mailOptions) {
    try { 
        let emailTransporter = await createTransporter();
        emailTransporter.sendMail(mailOptions, function(err,data){
            if (err) {
                console.log("error: " + err)
            } else {
                next()
            }
        });
    } catch (error) {
        console.log("Error: " + error)
    }   
}

export default sendEmail;