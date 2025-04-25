"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userActions_controller_1 = require("../controllers/userActions.controller");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.post("/register", userActions_controller_1.registerUser);
app.post("/login", userActions_controller_1.loginUser);
// app.get("/protected", auth.authenticateToken, (req, res) => {
//     res.json({ message: "This is a protected route", user: req.user });
// });
// app.get("/admin", auth.authenticateToken, auth.authorizeRole(["admin"]), (req, res) => {
//     res.json({ message: "Admin access granted", user: req.user });
// });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
