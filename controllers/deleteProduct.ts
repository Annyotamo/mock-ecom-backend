import { Request, Response } from "express";
import deleteProductHelper from "../services/deleteProduct.service";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

export default async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const deletedData = await deleteProductHelper(id);
        res.status(deletedData.status).json(deletedData.data);
        return;
    } catch (error) {
        console.error("Error in deleting product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
