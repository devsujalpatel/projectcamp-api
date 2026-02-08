import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(helmet());

// import routes
import healthCheckRouter from "./routes/v1/healthcheck.route";
import authRoutes from "./routes/v1/auth.routes";

// use routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to projectcamp");
});
app.use(errorHandler);

export default app;
