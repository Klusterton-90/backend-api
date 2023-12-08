import User from "../../models/User.js";
import HealthProfessional from "../../models/HealthProfessional.js";
import sendEmail from "../../helpers/emailSender.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import { fileURLToPath } from 'url';
import path from 'path';

const signup = async function (req, res) {
  try {
    const { username, password, email, name, phoneNumber, HealthProfessionalId, usertype } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({
        error: "Sorry, already a user with this email already exists",
      });
    } else if (!user) {
      const healthprof = await HealthProfessional.findOne({
        where: { email: email },
      });
      if (healthprof) {
        return res.status(400).json({
          error: "Sorry, already a user with this email already exists",
        });
      }
    }

    if (usertype == 'patient') {
      
      const newUser = {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        HealthProfessionalId: HealthProfessionalId,
      };

      await User.create(newUser);
    }
    else if (usertype == 'healthProfessional') {
      const newHealthProfessional = {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
      };

      await HealthProfessional.create(newHealthProfessional);
    }

    const verificationToken = jwt.sign({ email }, process.env.jwtSecret, {
      expiresIn: "1d",
    });

    const verificationLink = `https://medpal-api.onrender.com/api/v1/verify/${verificationToken}`;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.resolve( __dirname,'..', '..', 'views', 'MedPal.ejs');
    const emailHtml = await ejs.renderFile(templatePath, { name, verificationLink });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: emailHtml,
    };
    await sendEmail(mailOptions);
    return res.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

export default signup;
