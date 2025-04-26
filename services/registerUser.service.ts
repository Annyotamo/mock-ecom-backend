import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import userModel from "../models/user.model.js";

export default async function registerUserHelper(req: Request, res: Response) {
    try {
        const { name, phone, password, role = ["user"] } = req.body;

        if (!phone || !password || !name) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: StatusMessages[StatusCodes.BAD_REQUEST],
                },
            };
        }

        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(phone)) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: "Enter a 10 digit phone number",
                },
            };
        }

        const existingUser = await userModel.findOne({ phone });
        if (existingUser) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: "Pre-existing phone number",
                },
            };
        }

        const user = await userModel.create({
            name,
            phone,
            password,
            role,
        });

        return {
            status: StatusCodes.CREATED,
            data: {
                success: true,
                message: StatusMessages[StatusCodes.CREATED],
                user: {
                    id: user._id,
                    phone: user.phone,
                    role: user.role,
                },
            },
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
            },
        };
    }
}
