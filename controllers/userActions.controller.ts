import { Request, Response } from "express";
import { StatusCodes } from "../utils/statusCodes.js";
import registerUserHelper from "../services/registerUser.service.js";
import loginUserHelper from "../services/loginUser.service.js";

export async function registerUser(req: Request, res: Response): Promise<void> {
    const newUser = await registerUserHelper(req, res);
    res.status(StatusCodes.ACCEPTED).json(newUser);
    return;
}
export async function loginUser(req: Request, res: Response): Promise<void> {
    const loggedInUser = await loginUserHelper(req, res);
    res.status(StatusCodes.ACCEPTED).json(loggedInUser);
    return;
}
