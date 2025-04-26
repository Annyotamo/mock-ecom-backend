"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const productActions_route_1 = __importDefault(require("./routes/productActions.route"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const cors_1 = __importDefault(require("cors"));
const userActions_route_1 = __importDefault(require("./routes/userActions.route"));
const auth_1 = require("./config/auth");
const adminUserActions_route_1 = __importDefault(require("./routes/adminUserActions.route"));
const transactionRoute_1 = __importDefault(require("./routes/transactionRoute"));
const port = 8000;
const server = (0, express_1.default)();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        server.use((0, cors_1.default)());
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded());
        server.use("/api/product", auth_1.authenticateToken, (0, auth_1.authorizeRole)(["admin"]), productActions_route_1.default);
        server.use("/api/products", auth_1.authenticateToken, products_route_1.default);
        server.use("/api/auth", userActions_route_1.default);
        server.use("/api/user", auth_1.authenticateToken, (0, auth_1.authorizeRole)(["admin"]), adminUserActions_route_1.default);
        server.use("/api/transaction", auth_1.authenticateToken, (0, auth_1.authorizeRole)(["admin"]), transactionRoute_1.default);
    });
}
startServer();
server.listen(port, () => console.log(`Server is running in port: ${port}`));
