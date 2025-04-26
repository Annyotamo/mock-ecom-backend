"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = "10m";
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
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !Array.isArray(req.user.role)) {
            res.status(403).json({ message: "Unauthorized: User roles not found or invalid" });
            return;
        }
        const hasRequiredRole = req.user.role.some((userRole) => allowedRoles.includes(userRole));
        if (!hasRequiredRole) {
            res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
            return;
        }
        next();
    };
}
exports.authorizeRole = authorizeRole;
