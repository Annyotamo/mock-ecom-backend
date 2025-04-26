"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getProducts_js_1 = __importDefault(require("../controllers/getProducts.js"));
const purchaseProduct_js_1 = __importDefault(require("../controllers/purchaseProduct.js"));
const router = (0, express_1.Router)();
router.get("/all", getProducts_js_1.default);
router.get("/purchase", purchaseProduct_js_1.default);
exports.default = router;
