import userModel from "../models/user.model.js";
import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import { generateToken } from "../config/auth.js";
export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const { phone, password, role = ["user"] } = req.body;

        if (!phone || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: StatusMessages[StatusCodes.BAD_REQUEST],
            });
            return;
        }

        const existingUser = await userModel.findOne({ phone });
        if (existingUser) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: StatusMessages[StatusCodes.BAD_REQUEST],
            });
            return;
        }

        const user = await userModel.create({
            phone,
            password,
            role,
        });

        const token = generateToken({ id: user._id, phone: user.phone, role: user.role });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: StatusMessages[StatusCodes.CREATED],
            token,
            user: {
                id: user._id,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
export async function loginUser(req: Request, res: Response) {}
