import { Response, Request } from "express";
import { getProducts as getProductsHelper } from "../services/getProducts.service";
import { StatusCodes } from "../utils/statusCodes";

export default async function getProducts(req: Request, res: Response) {
    const dataInfo = await getProductsHelper();
    res.status(StatusCodes.ACCEPTED).json(dataInfo);
}
