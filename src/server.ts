import express from "express";
import dotenv from "dotenv";
import { sequelize, testConnection } from "./utils/db";
import { userRouter } from "./routes/users/user.routes";
import { todoRouter } from "./routes/todo/todo.routes";
import { setupAssociations } from "./associations/associations";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Health check for Render deployment
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Mount routers under a single /api prefix.
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);

// Catch-all 404 handler for API routes
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const startServer = async () => {
  try {
    await testConnection();

    // Initialize associations before syncing
    setupAssociations();

    // Only sync when specifically requested via environment variable
    if (process.env.DB_SYNC === "true") {
      await sequelize.sync();
      console.log("Database synced successfully.");
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
