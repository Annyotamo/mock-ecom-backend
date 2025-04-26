import express from "express";
import connectDB from "./config/db.js";
import productUploadRouter from "./routes/productUpload.route.js";
import productsRouter from "./routes/products.route.js";
import cors from "cors";
import userActionsRouter from "./routes/userActions.route";

const port = 8000;
const server = express();

async function startServer() {
    await connectDB();
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded());
    server.use("/api/product/upload", productUploadRouter);
    // server.use("/api/product/delete");
    server.use("/api/products", productsRouter);
    server.use("/api/auth", userActionsRouter);
    // server.use("/api/purchase");
}

startServer();
server.listen(port, () => console.log(`Server is running in port: ${port}`));
