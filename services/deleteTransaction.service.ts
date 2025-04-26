import { StatusCodes } from "../utils/statusCodes";
import transactionModel from "../models/transaction.model";
import mongoose from "mongoose";

export default async function deleteTransactionHelper(
    id: string
): Promise<{ status: number; data: { success: boolean; message: string; deletedTransaction?: any } }> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            status: StatusCodes.BAD_REQUEST,
            data: {
                success: false,
                message: "Invalid transaction ID format.",
            },
        };
    }

    try {
        const existingTransaction = await transactionModel.findById(id);
        if (!existingTransaction) {
            return {
                status: StatusCodes.NOT_FOUND,
                data: {
                    success: false,
                    message: "Transaction not found.",
                },
            };
        }

        const deletedTransaction = await transactionModel.deleteOne({ _id: id });

        if (deletedTransaction.deletedCount > 0) {
            return {
                status: StatusCodes.ACCEPTED,
                data: {
                    success: true,
                    message: "Transaction deleted successfully",
                    deletedTransaction: existingTransaction,
                },
            };
        } else {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "Failed to delete transaction.",
                },
            };
        }
    } catch (error: any) {
        console.error("Error deleting transaction:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "An error occurred while deleting the transaction.",
            },
        };
    }
}
