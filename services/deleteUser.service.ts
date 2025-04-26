import userModel from "../models/user.model";
import { StatusCodes } from "../utils/statusCodes";

export default async function deleteUserHelper(id: string) {
    try {
        const deletedUser = await userModel.deleteOne({ _id: id });
        return {
            status: StatusCodes.ACCEPTED,
            user: deletedUser,
        };
    } catch (error) {
        console.log("Error:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
        };
    }
}
