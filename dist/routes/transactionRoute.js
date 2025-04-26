"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteTransaction_1 = __importDefault(require("../controllers/deleteTransaction"));
const getTransactions_1 = __importDefault(require("../controllers/getTransactions"));
const router = (0, express_1.Router)();
router.get("/", getTransactions_1.default);
router.delete("/delete", deleteTransaction_1.default);
exports.default = router;
