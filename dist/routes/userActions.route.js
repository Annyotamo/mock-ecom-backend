"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userActions_controller_1 = require("../controllers/userActions.controller");
const router = (0, express_1.Router)();
router.post("/register", userActions_controller_1.registerUser);
router.post("/login", userActions_controller_1.loginUser);
exports.default = router;
