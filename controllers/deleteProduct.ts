import { Request, Response } from "express";
import deleteProductHelper from "../services/deleteProduct.service";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

export default async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const deletedData = await deleteProductHelper(id);
        if (deletedData.status != 200) {
            res.status(deletedData.status).json(deletedData);
            return;
        }
        res.status(deletedData.status).json(deletedData);
        return;
    } catch (error) {
        console.log("Error in deleting product:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: StatusMessages[StatusCodes.INTERNAL_SERVER_ERROR],
        });
        return;
    }
}
