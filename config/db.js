import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  });

export default sequelize;
