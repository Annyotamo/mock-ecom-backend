import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/auth.js";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import { Request, Response } from "express";

export default async function loginUserHelper(req: Request, res: Response) {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: StatusMessages[StatusCodes.BAD_REQUEST] });
        }

        const user = await userModel.findOne({ phone: phone });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: StatusMessages[StatusCodes.BAD_REQUEST] });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: StatusMessages[StatusCodes.UNAUTHORIZED] });
        }

        const token = generateToken({ id: user._id, phone: user.phone, role: user.role });

        return res.json({ id: user._id, token: token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
    }
}
