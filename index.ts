import express from "express";
import connectDB from "./config/db";
import productActionsRouter from "./routes/productActions.route";
import productsRouter from "./routes/products.route";
import cors from "cors";
import userActionsRouter from "./routes/userActions.route";
import { authenticateToken, authorizeRole } from "./config/auth";
import adminUserActionsRouter from "./routes/adminUserActions";
import transactionsRouter from "./routes/transactionRoute";

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
    server.use("/api/user", authenticateToken, authorizeRole(["admin"]), adminUserActionsRouter);
    server.use("/api/transaction", authenticateToken, authorizeRole(["admin"]), transactionsRouter);
}

startServer();
server.listen(port, () => console.log(`Server is running in port: ${port}`));
