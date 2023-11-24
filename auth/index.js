const express = require("express");
const passport = require("../passport");
const router = express.Router();
const User = require("../models/User");

//signup user
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.json({
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
});

//login user
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/");
});

//signout user
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "Log out successful" });
  }
});

module.exports = router;
