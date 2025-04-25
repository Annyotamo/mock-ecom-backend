import express from "express";
import bodyParser from "body-parser";
import * as auth from "../config/auth";
import * as userController from "../controllers/userActions.controller";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);

// app.get("/protected", auth.authenticateToken, (req, res) => {
//     res.json({ message: "This is a protected route", user: req.user });
// });

// app.get("/admin", auth.authenticateToken, auth.authorizeRole(["admin"]), (req, res) => {
//     res.json({ message: "Admin access granted", user: req.user });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
