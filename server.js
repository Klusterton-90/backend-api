import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cors from "cors";
import passport from "./middlewares/passport/index.js";
import sequelize from "./config/db.js";
import authRouter from './routes/authRoutes.js'
import patientRouter from './routes/patientRoutes.js'
import healthRouter from './routes/healthProfRoutes.js'
import adherenceRouter from './routes/adherenceRoutes.js'
dotenv.config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://medpal.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true, // Enable preflight requests
  credentials: true,
  optionsSuccessStatus: 204, // Use 204 No Content for preflight success status
};

app.options('*', cors()); // Set up a global OPTIONS handler
app.use(cors());
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
app.use('/api/v1', authRouter)
app.use('/api/v1', patientRouter)
app.use('/api/v1', healthRouter)
app.use('/api/v1', adherenceRouter)

sequelize.sync();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
