import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const connection = await mongoose.connect(
            env.MONGODB_URI
        );

        isConnected =
            connection.connections[0].readyState === 1;

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error");

        throw error;
    }
};