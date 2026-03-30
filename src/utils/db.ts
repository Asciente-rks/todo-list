import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const commonOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 4000, // TiDB default port is 4000
  dialect: "mysql" as const,
  timezone: "+00:00", // Force UTC to keep queries consistent and efficient
  logging: false, // Disabling logging saves RUs by reducing metadata overhead
  dialectOptions: {
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  },
  pool: {
    max: 5, // Small pool size is better for Render's free/starter tiers
    min: 0,
    acquire: 30000,
    idle: 2000, // Reduced idle timeout as requested
  },
};

export const todoSequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  commonOptions,
);

export const userSequelize = new Sequelize(
  process.env.USER_DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  commonOptions,
);

export const testConnection = async () => {
  try {
    // Authenticate both instances to ensure credentials are correct
    await Promise.all([
      todoSequelize.authenticate(),
      userSequelize.authenticate(),
    ]);
    console.log("Database connections established successfully.");
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
    throw error;
  }
};
