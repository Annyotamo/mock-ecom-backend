import userModel from "../models/user.model";
import { StatusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

export default async function deleteUserHelper(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            status: StatusCodes.BAD_REQUEST,
            data: {
                success: false,
                message: "Invalid user ID format.",
            },
        };
    }

    try {
        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: {
                    success: false,
                    message: "User not found.",
                },
            };
        }

        const deletedUser = await userModel.deleteOne({ _id: id });

        if (deletedUser.deletedCount > 0) {
            return {
                status: StatusCodes.ACCEPTED,
                data: {
                    success: true,
                    message: "User deleted successfully",
                },
            };
        } else {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "Failed to delete user.",
                },
            };
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "An error occurred while deleting the user.",
            },
        };
    }
}
