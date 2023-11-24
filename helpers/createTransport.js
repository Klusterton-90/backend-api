import nodemailer from 'nodemailer';

async function createTransporter() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          pass: process.env.GMAILPASSWORD,
          clientId: process.env.CLIENTID,
          clientSecret: process.env.CLIENTSECRET,
          refreshToken: process.env.REFRESHTOKEN
        }
    });
    return transporter
}

export default createTransporter;