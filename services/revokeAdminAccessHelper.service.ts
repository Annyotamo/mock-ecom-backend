import userModel from "../models/user.model";
import { StatusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

export default async function revokeAdminAccessHelper(
    id: string
): Promise<{ status: number; data: { success: boolean; message: string; user?: any } }> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            status: StatusCodes.BAD_REQUEST,
            data: { success: false, message: "Invalid user ID format." },
        };
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, { $pull: { role: "admin" } }, { new: true });

        if (!updatedUser) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: { success: false, message: "User not found." },
            };
        }

        const isAdmin = updatedUser.role.includes("admin");
        if (isAdmin) {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "Failed to revoke admin access. User is still an admin.",
                    user: updatedUser,
                },
            };
        }

        return {
            status: StatusCodes.OK,
            data: { success: true, message: "Admin access revoked", user: updatedUser },
        };
    } catch (error: any) {
        console.error("Error revoking admin access:", error.message);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "Failed to revoke admin access.",
            },
        };
    }
}
