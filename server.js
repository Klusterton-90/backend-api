import express from "express";
import dotenv from "dotenv";
import session from "cookie-session";
import passport from "./middlewares/passport/index.js";
import sequelize from "./config/db.js";
import authrouter from './routes/authRoutes.js'

dotenv.config();

const app = express();


session({
    name: 'session',
    keys: ['klusterton'],
  })

sequelize.authenticate();

app.use(session);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/v1', authrouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
