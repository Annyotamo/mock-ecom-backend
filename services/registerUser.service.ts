import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import userModel from "../models/user.model.js";

export default async function registerUserHelper(req: Request, res: Response) {
    try {
        const { phone, password, role = ["user"] } = req.body;
        console.log(phone, password);

        if (!phone || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: StatusMessages[StatusCodes.BAD_REQUEST],
            });
        }

        const existingUser = await userModel.findOne({ phone });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: StatusMessages[StatusCodes.BAD_REQUEST],
            });
        }

        const user = await userModel.create({
            phone,
            password,
            role,
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: StatusMessages[StatusCodes.CREATED],
            user: {
                id: user._id,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
    }
}
