import { Request, Response } from "express";
import productModel from "../models/productData.model";
import transactionModel from "../models/transaction.model";

export default async function purchaseProductHelper(req: Request, res: Response) {
    try {
        const { id } = req.query;
        console.log(id);
        const productData = await productModel.findById(id);
        console.log(productData);
        if (!productData) {
            return null;
        }
        const { name, price } = productData;
        const newTransaction = await transactionModel.create({
            productId: id,
            productName: name,
            productPrice: price,
        });
        const transactionData = await newTransaction.save();
        return {
            message: "Purchased product successfully",
            data: transactionData,
        };
    } catch (error) {
        console.log("Error is product transaction:", error);
        return null;
    }
}
