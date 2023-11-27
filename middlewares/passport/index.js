import passport from "passport";
import LocalStrategy from "./localStrategy.js";
import User from "../../models/User.js";

passport.use(LocalStrategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    done(null, user);
  });
});



export default passport;
