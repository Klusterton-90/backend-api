import User from "../../models/User.js";
import { Strategy } from "passport-local";

const LocalStrategy = new Strategy(async function (name, password, done) {
  try {
    const user = await User.findOne({ where: { name: name } });
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

export default LocalStrategy
