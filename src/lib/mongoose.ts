import mongoose, { ConnectOptions } from "mongoose";
import config from "@/config";

const clientOptions: ConnectOptions = {
  dbName: "project-camp",
  appName: "Project Camp",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error("MongoDB URI is not defined in the configuration.");
  }

  try {
    if (mongoose.connection.readyState !== 0) {
      console.log("⚡ MongoDB already connected or connecting...");
      return;
    }

    await mongoose.connect(config.MONGO_URI, clientOptions);

    console.log("✅ Connected to MongoDB", {
      host: mongoose.connection.host,
      db: mongoose.connection.name,
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error disconnecting from MongoDB:", err);
  }
};

// Close connection gracefully on process exit
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});
