import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import registerUserHelper from "../services/registerUser.service.js";
import loginUserHelper from "../services/loginUser.service.js";

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const newUser = await registerUserHelper(req, res);
        if (newUser.status != StatusCodes.CREATED) {
            res.status(newUser.status).json(newUser.data);
            return;
        }
        res.status(StatusCodes.ACCEPTED).json(newUser.data);
        return;
    } catch (error) {
        console.error("Error creating new user [userActions.ts]:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
    }
}
export async function loginUser(req: Request, res: Response): Promise<void> {
    const { phone, password } = req.body;
    try {
        const loggedInUser = await loginUserHelper(phone, password);
        if (loggedInUser.status != StatusCodes.OK) {
            res.status(loggedInUser.status).json(loggedInUser.data);
            return;
        }
        res.status(StatusCodes.OK).json(loggedInUser.data);
    } catch (error) {
        console.error("Error during login [userActions.ts]", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
