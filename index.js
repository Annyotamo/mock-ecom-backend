import express from "express";
import connectDB from "./config/db.js";
import productUploadRouter from "./routes/productUpload.route.js";
import cors from "cors";

const port = 8000;
const server = express();

async function startServer() {
    await connectDB();
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded());
    server.use("/api/upload", productUploadRouter);
    server.use("/api/products");
    server.use("/api/buy");
}

startServer();
server.listen(port, () => console.log(`Server is running in port: ${port}`));
