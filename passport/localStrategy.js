const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(async function (username, password, done) {
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

module.exports = strategy;
