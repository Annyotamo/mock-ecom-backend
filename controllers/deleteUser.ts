import { Request, Response } from "express";
import deleteUserHelper from "../services/deleteUser.service";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

export default async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const deletedData = await deleteUserHelper(id);

        res.status(deletedData.status).json(deletedData.data);
        return;
    } catch (error) {
        console.error("Error in deleting user:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
