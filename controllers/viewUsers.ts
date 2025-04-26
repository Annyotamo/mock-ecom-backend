import { Request, Response } from "express";
import userModel from "../models/user.model";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

export default async function viewUsers(req: Request, res: Response) {
    try {
        const allUsers = await userModel.find({});
        res.status(StatusCodes.ACCEPTED).json(allUsers);
        return;
    } catch (error) {
        console.log("Error in fetching user data [viewUsers.ts]", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
