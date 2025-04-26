import express from "express";
import connectDB from "./config/db.js";
import productActionsRouter from "./routes/productActions.route.js";
import productsRouter from "./routes/products.route.js";
import cors from "cors";
import userActionsRouter from "./routes/userActions.route";
import { authenticateToken, authorizeRole } from "./config/auth.js";

const port = 8000;
const server = express();

async function startServer() {
    await connectDB();
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded());
    server.use("/api/product", authenticateToken, authorizeRole(["admin"]), productActionsRouter);
    server.use("/api/products", authenticateToken, productsRouter);
    server.use("/api/auth", userActionsRouter);
    // server.use("/api/purchase");
}

startServer();
server.listen(port, () => console.log(`Server is running in port: ${port}`));
