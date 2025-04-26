import { Request, Response } from "express";
import productModel from "../models/productData.model";
import transactionModel from "../models/transaction.model";
import { StatusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

export default async function purchaseProductHelper(
    req: Request,
    res: Response
): Promise<{ status: number; data: { success: boolean; message: string; transaction?: any } }> {
    try {
        const { id } = req.query;

        if (!id) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: { success: false, message: "Product ID is required." },
            };
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return {
                status: StatusCodes.BAD_REQUEST,
                data: { success: false, message: "Invalid product ID format." },
            };
        }

        const productData = await productModel.findById(id);

        if (!productData) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: { success: false, message: "Product not found." },
            };
        }

        const { name, price } = productData;
        const newTransaction = await transactionModel.create({
            productId: id,
            productName: name,
            productPrice: price,
        });
        const transactionData = await newTransaction.save();

        return {
            status: StatusCodes.ACCEPTED,
            data: {
                success: true,
                message: "Purchased product successfully",
                transaction: transactionData,
            },
        };
    } catch (error: any) {
        console.error("Error in product transaction:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "An error occurred during the purchase process.",
            },
        };
    }
}
