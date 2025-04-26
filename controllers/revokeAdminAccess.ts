import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import revokeAdminAccessHelper from "../services/revokeAdminAccessHelper.service";

export default async function revokeAdminAccess(req: Request, res: Response) {
    const { id } = req.body;

    try {
        const revokeAccessResult = await revokeAdminAccessHelper(id);
        res.status(revokeAccessResult.status).json(revokeAccessResult.data);
        return;
    } catch (error) {
        console.error("Error in revokeAdminAccess controller:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
