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

// Global error handler to catch connection timeouts and other DB issues
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(`[Internal Error] ${req.method} ${req.url}:`, err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  },
);

const startServer = async () => {
  try {
    await testConnection();

    // Initialize associations before syncing
    setupAssociations();

    // This ensures tables (users, todos) are created if they don't exist in todo_list_db
    // sync() is smart: it won't drop existing data, it just creates missing tables.
    await sequelize.sync();
    console.log("Database synced successfully - all tables verified.");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
