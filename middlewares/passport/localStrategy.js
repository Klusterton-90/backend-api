import User from "../../models/User.js";
import { Strategy } from "passport-local";

const strategy = new Strategy(async function (username, password, done) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return done(null, false, { message: "Incorrect username. " });
    }
    const passwordValue = user.validPassword(password);
    if (!passwordValue) {
      return done(null, false, {
        message: "Incorrect Password",
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default strategy
