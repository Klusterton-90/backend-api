import express from 'express';
import dotenv from 'dotenv';

dotenv.config()


const app = express()

import sequelize from './config/db.js'
sequelize.authenticate()


const PORT = process.env.PORT
app.listen(PORT, ()=>{
 console.log('server is running on ' + PORT)
})