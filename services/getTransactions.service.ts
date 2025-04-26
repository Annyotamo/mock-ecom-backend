import transactionModel from "../models/transaction.model";
import { StatusCodes } from "../utils/statusCodes";

export async function getTransactionsHelper(): Promise<{
    status: number;
    data: { success: boolean; message: string; transactions?: any[] };
}> {
    try {
        const transactions = await transactionModel.find({});

        return {
            status: StatusCodes.OK,
            data: {
                success: true,
                message: "Transactions retrieved successfully.",
                transactions,
            },
        };
    } catch (error: any) {
        console.error("Error fetching transactions:", error.message);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                success: false,
                message: "Failed to retrieve transactions.",
            },
        };
    }
}
