import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import passport from "./middlewares/passport/index.js";
import sequelize from "./config/db.js";
import authrouter from './routes/authRoutes.js'
import patientrouter from './routes/patientRoutes.js'
import healthrouter from './routes/healthProfRoutes.js'


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cookieSession({
      name: 'session',
      keys: ['Klusterton-90'],
    })
  );

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/v1', authrouter)
app.use('/api/v1', patientrouter)
app.use('/api/v1', healthrouter)

sequelize.sync();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
