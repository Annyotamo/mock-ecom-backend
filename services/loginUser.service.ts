// src/services/loginUser.service.js (adjust path if needed)
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/auth.js";

export default async function loginUserHelper(phone: string, password: string) {
    try {
        const user = await userModel.findOne({ phone: phone }).select("+password");

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        const token = generateToken({ id: user._id, phone: user.phone, role: user.role });

        return {
            id: user._id,
            token: token,
        };
    } catch (error) {
        console.error("Login service error:", error);
        throw error;
    }
}
