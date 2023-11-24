import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

dotenv.config();

const app = express();
const session = require("express-session");
const passport = require("./passport");

const sess = {
  secret: "klusterton",
  cookie: {},
};

sequelize.authenticate();

app.use(session(sess));

//Passport
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
