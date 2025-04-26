"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteUser_1 = __importDefault(require("../controllers/deleteUser"));
const provideAdminAccess_1 = __importDefault(require("../controllers/provideAdminAccess"));
const viewUsers_1 = __importDefault(require("../controllers/viewUsers"));
const revokeAdminAccess_1 = __importDefault(require("../controllers/revokeAdminAccess"));
const router = (0, express_1.Router)();
router.get("/all", viewUsers_1.default);
router.delete("/delete", deleteUser_1.default);
router.post("/admin-access", provideAdminAccess_1.default);
router.post("/revoke-admin-access", revokeAdminAccess_1.default);
exports.default = router;
