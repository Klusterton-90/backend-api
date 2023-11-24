import User from "../../models/User.js";
import sendEmail from "../../helpers/emailSender.js";
import jwt from "jsonwebtoken";

const signup = async function (req, res) {
  try {
    const { username, password, email, name, phoneNumber } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({
        error: "Sorry, already a user with this email already exists",
      });
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      name: name,
      phoneNumber: phoneNumber,
    };

    await User.create(newUser);

    const verificationToken = jwt.sign({ email }, process.env.jwtSecret, {
      expiresIn: "1d",
    });

    const verificationLink = `http://localhost:8080/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: ${verificationLink}`,
    };
    console.log("here");
    await sendEmail(mailOptions);
    console.log("here");
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
