import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./db/index.js";

const app = express();

const PORT = process.env.PORT ?? 8000;

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.end("Hello from project camp");
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
