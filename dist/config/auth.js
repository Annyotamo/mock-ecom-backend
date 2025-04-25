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
exports.authorizeRole = exports.authenticateToken = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = "2m";
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        return yield bcrypt_1.default.hash(password, saltRounds);
    });
}
exports.hashPassword = hashPassword;
function comparePassword(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    });
}
exports.comparePassword = comparePassword;
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
}
exports.verifyToken = verifyToken;
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }
    const user = verifyToken(token);
    if (!user) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
    req.user = user;
    next();
}
exports.authenticateToken = authenticateToken;
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        next();
    };
}
exports.authorizeRole = authorizeRole;
