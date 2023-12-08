import User from "../../models/User.js";

const login = async function (req, res) {
  if (req.isAuthenticated()) {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(200).json({
        status: 200,
        userType: "Health Professional",
        message: "User logged in successfully",
        data: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          phoneNumber: req.user.phoneNumber,
        },
      });
    } else if (user) {
      res.status(200).json({
        status: 200,
        userType: "Patient",
        message: "User logged in successfully",
        data: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          phoneNumber: req.user.phoneNumber,
          HealthProfessionalId: req.user.HealthProfessionalId,
        },
      });
    }
  }
};

export default login;
