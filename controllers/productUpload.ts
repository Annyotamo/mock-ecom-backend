import { Request, Response } from "express";
import { StatusCodes } from "../utils/statusCodes.js";
import { productUpload as productUploadHelper } from "../services/productUpload.service";

export default async function productUpload(req: Request, res: Response): Promise<void> {
    const productUploadData = await productUploadHelper(req, res);
    res.status(StatusCodes.ACCEPTED).json(productUploadData);
    return;
}
