import userModel from "../models/user.model";
import { StatusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

export async function provideAdminAccessHelper(
    id: string
): Promise<{ status: number; data: { success: boolean; message: string; user?: any } }> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            status: StatusCodes.BAD_REQUEST,
            data: { success: false, message: "Invalid user ID format." },
        };
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, { $addToSet: { role: "admin" } }, { new: true });

        if (!updatedUser) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: { success: false, message: "User not found." },
            };
        }

        return {
            status: StatusCodes.OK,
            data: { success: true, message: "Admin access granted", user: updatedUser },
        };
    } catch (error: any) {
        console.error("Error granting admin access:", error.message);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "Failed to grant admin access.",
            },
        };
    }
}
