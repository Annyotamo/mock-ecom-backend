import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import purchaseProductHelper from "../services/purchaseProduct.service";

export default async function purchaseProduct(req: Request, res: Response) {
    try {
        const transactionData = await purchaseProductHelper(req, res);
        if (!transactionData) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: StatusMessages[StatusCodes.BAD_REQUEST] });
            return;
        }
        res.status(StatusCodes.ACCEPTED).json(transactionData);
        return;
    } catch (error) {
        console.log("Error in product transaction:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
    }
}
