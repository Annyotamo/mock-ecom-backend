import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI || "";
export default async function connectDB() {
    try {
        const conn = await mongoose.connect(URI, {
            dbName: "mock-ecom",
        });
        console.log(`Connected to database: ${conn.connection.host}`);
    } catch (e) {
        console.log("Internal error:", e);
    }
}
