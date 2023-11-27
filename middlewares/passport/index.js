import passport from "passport";
import User from "../../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy(async function (name, password, done) {
  try {
    const user = await User.findOne({ where: { name: name } });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
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
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    done(null, user);
  });
});



export default passport;
