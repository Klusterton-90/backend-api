import User from "../../models/User.js";

const signup = async function (req, res) {
  try {

    const { username, password, email } = req.body;
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
    };

    await User.create(newUser);

    res.status(200).json({ message: "user created successfully" });
    
  } catch (error) {
    res.status(500).json({
        status: 500,
        message: "Internal Server Error"
    })
    
  }
}

export default signup;