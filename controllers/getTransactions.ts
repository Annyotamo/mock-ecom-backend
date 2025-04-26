import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import { getTransactionsHelper } from "../services/getTransactions.service";

export default async function getTransactions(req: Request, res: Response) {
    try {
        const transactionsResult = await getTransactionsHelper();
        res.status(transactionsResult.status).json(transactionsResult.data);
        return;
    } catch (error) {
        console.error("Error in getTransactions controller:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
