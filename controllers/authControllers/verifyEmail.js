import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const verifyEmail = async function (req, res) {
    try {
        const { token } = req.params;
  
    jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(400).send('Invalid or expired token');
      }
  
      const userEmail = decoded.email;
  
      User.findOne({where: {email: userEmail}}).then(user => {
        user.update({ verified: true });

        return res.status(200).json({
            status: 200,
            message: 'Email verified successfully'
        });
      }).catch( error => {
        return res.status(404).json({
            status: 404,
            message: 'User not found',
            error: error.message
        });
      })
    });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }

}

export default verifyEmail;