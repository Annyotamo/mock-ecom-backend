import productModel from "../models/productData.model";
import { StatusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

export default async function deleteProductHelper(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            status: StatusCodes.BAD_REQUEST,
            data: {
                success: false,
                message: "Invalid product ID format.",
            },
        };
    }

    try {
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: {
                    success: false,
                    message: "Product not found.",
                },
            };
        }

        const deletedProduct = await productModel.deleteOne({ _id: id });

        if (deletedProduct.deletedCount > 0) {
            return {
                status: StatusCodes.ACCEPTED,
                data: {
                    success: true,
                    message: "Product deleted successfully",
                },
            };
        } else {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "Failed to delete product.",
                },
            };
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "An error occurred while deleting the product.",
            },
        };
    }
}
