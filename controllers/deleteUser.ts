import { Request, Response } from "express";
import deleteUserHelper from "../services/deleteUser.service";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

export default async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const deletedUser = await deleteUserHelper(id);
        if (deletedUser.status != 200) {
            res.status(deletedUser.status).json(deletedUser);
            return;
        }
        res.status(deletedUser.status).json(deletedUser);
        return;
    } catch (error) {
        console.log("Error in deleting product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
