const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    done(null, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
