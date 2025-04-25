import { Response, Request } from "express";
import { getProducts as getProductsHelper } from "../services/getProducts.service";

export default async function getProducts(req: Request, res: Response) {
    const dataInfo = getProductsHelper();
    res.json(dataInfo);
}
