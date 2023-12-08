import passport from "passport";
import User from "../../models/User.js";
import HealthProfessional from "../../models/HealthProfessional.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { email: username } });
      //If its a patient
      if (user) {
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
      }
      if (!user) {
        //If its a health professional
        const professional = await HealthProfessional.findOne({
          where: { email: username },
        });

        if (!professional) {
          return done(null, false, {
            message: "User identity not valid",
          });
        }
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
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //Check if its a patient
  if (User.findByPk(id)) {
    //If true
    User.findByPk(id).then(function (user) {
      done(null, user);
    });
  } else {
    //If its not a patient then its a health professional
    HealthProfessional.findByPk(id).then(function (user) {
      done(null, user);
    });
  }
});

export default passport;
