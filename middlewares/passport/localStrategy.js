import User from "../../models/User.js";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

const strategy = new Strategy(async function (username, password, done) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return done(null, false, { message: "Incorrect username. " });
    }

    //password validation
    const passwordIsValid = (userPassword, enteredPassword) => {
      return bcrypt.compareSync(enteredPassword, userPassword);
    };

    if (!passwordIsValid(user.password, password)) {
      return done(null, false, {
        message: "Incorrect Password",
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default strategy;
