import mongoose from "mongoose";
import config from "@/config";

export const connectDB = async () => {
    try {
        if(!config.MONGO_URI) {
            throw new Error("No MongoDB_URI Found")
        }
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ MongoDB Connection Successfull")
    } catch (error) {
        console.log("❌ MongoDB Connection Failed", error);
        process.exit(1)
    }
}

