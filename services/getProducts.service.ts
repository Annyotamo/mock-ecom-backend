import { Product } from "../models/productData.model.js";
import productDataModel from "../models/productData.model";

export async function getProducts(): Promise<Product[]> {
    return await productDataModel.find({});
}
