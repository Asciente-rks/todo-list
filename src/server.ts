import express from "express";
import dotenv from "dotenv";
import { sequelize, testConnection } from "./utils/db";
import { userRouter } from "./routes/users/user.routes";
import { todoRouter } from "./routes/todo/todo.routes";
import { setupAssociations } from "./associations/associations";
import cors from "cors";

dotenv.config();

const app = express();

// 1. CORS Configuration - Crucial for Mobile APKs
app.use(
  cors({
    origin: "*", // This reflects the request origin, which allows credentials to work
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: false,
  }),
);

app.use(express.json());

// 2. LOGGING MIDDLEWARE - This lets you see the APK's requests in Render Logs
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Handle root route to prevent 404s during health checks or wake-ups
app.get("/", (req, res) => {
  res.status(200).send("Server is alive");
});

// 3. BASE API ROUTE - This stops the "404 - GET /api" error in your logs
// When the APK checks if the server is awake, it will now get a 200 OK.
app.get("/api", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "To-Do List API is fully operational",
  });
});

// 4. HEALTH CHECK for Render
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 5. MOUNT ROUTERS
// NOTE: If your login is inside userRouter as router.post("/login"),
// the full URL will be: https://your-link.onrender.com/api/users/login
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

// 6. CATCH-ALL 404
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// 7. GLOBAL ERROR HANDLER
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
    setupAssociations();
    await sequelize.sync();

    console.log("Database synced successfully - all tables verified.");

    const PORT: number = parseInt(process.env.PORT || "10000", 10);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
