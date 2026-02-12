import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

export const todoSequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false
  }
);

export const userSequelize = new Sequelize(
  process.env.USER_DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false
  }
);

export const testConnection = async () => {
  try {
    await todoSequelize.authenticate();
    console.log(' Connection to Todo DB established successfully.');

    await todoSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.USER_DB_NAME}\`;`);

    await userSequelize.authenticate();
    console.log(' Connection to User DB established successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
};
