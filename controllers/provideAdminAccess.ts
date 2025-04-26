import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import { provideAdminAccessHelper } from "../services/provideAdminAccess.service";

export default async function provideAdminAccess(req: Request, res: Response) {
    const { id } = req.body;

    try {
        const adminAccessResult = await provideAdminAccessHelper(id);
        res.status(adminAccessResult.status).json(adminAccessResult.data);
        return;
    } catch (error) {
        console.error("Error in provideAdminAccess controller:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
