import { Request, Response } from "express";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";
import purchaseProductHelper from "../services/purchaseProduct.service";

export default async function purchaseProduct(req: Request, res: Response) {
    try {
        const transactionResult = await purchaseProductHelper(req, res);
        res.status(transactionResult.status).json(transactionResult.data);
        return;
    } catch (error) {
        console.error("Error in product transaction controller:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
