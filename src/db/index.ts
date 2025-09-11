import mongoose from "mongoose";
import "dotenv/config"

export function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}

export function disconnectDB() {
  mongoose.disconnect();
}