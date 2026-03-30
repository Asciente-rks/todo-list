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
    connectTimeout: 60000, // Wait up to 60s for the TCP connection handshake
  },
  pool: {
    max: 5, // Small pool size is better for Render's free/starter tiers
    min: 0,
    acquire: 60000, // Wait up to 60s to get a connection from the pool
    idle: 30000, // Reduced idle timeout as requested
  },
};

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  commonOptions,
);

export const testConnection = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      // Authenticate the single instance
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return;
    } catch (error) {
      console.warn(
        `Database connection attempt ${i + 1} failed. Retrying in 5s...`,
      );
      if (i === retries - 1) {
        console.error("Maximum database connection retries reached.");
        throw error;
      }
      // Wait for 5 seconds before retrying to allow TiDB Serverless to wake up
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};
