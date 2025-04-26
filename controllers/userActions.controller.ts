import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes.js";
import registerUserHelper from "../services/registerUser.service.js";
import loginUserHelper from "../services/loginUser.service.js";

export async function registerUser(req: Request, res: Response): Promise<void> {
    const newUser = await registerUserHelper(req, res);
    res.status(StatusCodes.ACCEPTED).json(newUser);
    return;
}
export async function loginUser(req: Request, res: Response): Promise<void> {
    const { phone, password } = req.body;
    try {
        const loggedInUser = await loginUserHelper(phone, password);

        if (loggedInUser) {
            res.status(StatusCodes.OK).json(loggedInUser);
            return;
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
            return;
        }
    } catch (error) {
        console.error("Login controller error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
