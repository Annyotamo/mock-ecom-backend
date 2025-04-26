import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import deleteTransactionHelper from "../services/deleteTransaction.service";

export default async function deleteTransaction(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const deletionResult = await deleteTransactionHelper(id);

        res.status(deletionResult.status).json(deletionResult.data);
        return;
    } catch (error) {
        console.error("Error in deleting transaction controller:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
