import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/auth.js";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";

export default async function loginUserHelper(phone: string, password: string) {
    try {
        const user = await userModel.findOne({ phone: phone }).select("+password");

        if (!user) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: StatusMessages[StatusCodes.BAD_REQUEST],
                },
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                status: StatusCodes.UNAUTHORIZED,
                data: {
                    success: false,
                    message: "Invalid credentials",
                },
            };
        }

        const token = generateToken({ id: user._id, phone: user.phone, role: user.role });

        return {
            status: StatusCodes.OK,
            data: {
                success: true,
                id: user._id,
                token: token,
            },
        };
    } catch (error) {
        console.error("Login service error:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
            },
        };
    }
}
