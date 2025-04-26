"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userActions_1 = require("../controllers/userActions");
const router = (0, express_1.Router)();
router.post("/register", userActions_1.registerUser);
router.post("/login", userActions_1.loginUser);
exports.default = router;
