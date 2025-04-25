import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: any;
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const JWT_EXPIRES_IN = "2m";

export async function hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(payload: string | object | Buffer) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
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

export function authorizeRole(roles: [string]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        next();
    };
}
