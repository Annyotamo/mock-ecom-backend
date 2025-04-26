import { StatusCodes } from "../utils/statusCodes";
import transactionModel from "../models/transaction.model";
export default async function deleteTransactionHelper(id: string) {
    try {
        const deletedTransaction = await transactionModel.deleteOne({ _id: id });
        return {
            status: StatusCodes.ACCEPTED,
            user: deletedTransaction,
        };
    } catch (error) {
        console.log("Error:", error);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
        };
    }
}
