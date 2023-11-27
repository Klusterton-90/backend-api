import passport from "passport";
import User from "../../models/User.js";
import HealthProfessional from "../../models/HealthProfessional.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy(async function (username, password, done) {
  try {
    const user = await User.findOne({ where: { name: username } });
    if (!user) {
      const professional = await HealthProfessional.findOne({ where: { name: username } });
      const passwordIsValid = (userPassword, enteredPassword) => {
        return bcrypt.compareSync(enteredPassword, userPassword);
      };
  
      if (!passwordIsValid(professional.password, password)) {
        return done(null, false, {
          message: "Incorrect Password",
        });
      }
      return done(null, professional);
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
