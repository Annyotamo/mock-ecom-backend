"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../utils/statusCodes");
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const mongoose_1 = __importDefault(require("mongoose"));
function deleteTransactionHelper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return {
                status: statusCodes_1.StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: "Invalid transaction ID format.",
                },
            };
        }
        try {
            const existingTransaction = yield transaction_model_1.default.findById(id);
            if (!existingTransaction) {
                return {
                    status: statusCodes_1.StatusCodes.NOT_FOUND,
                    data: {
                        success: false,
                        message: "Transaction not found.",
                    },
                };
            }
            const deletedTransaction = yield transaction_model_1.default.deleteOne({ _id: id });
            if (deletedTransaction.deletedCount > 0) {
                return {
                    status: statusCodes_1.StatusCodes.ACCEPTED,
                    data: {
                        success: true,
                        message: "Transaction deleted successfully",
                        deletedTransaction: existingTransaction,
                    },
                };
            }
            else {
                return {
                    status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    data: {
                        success: false,
                        message: "Failed to delete transaction.",
                    },
                };
            }
        }
        catch (error) {
            console.error("Error deleting transaction:", error);
            return {
                status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "An error occurred while deleting the transaction.",
                },
            };
        }
    });
}
exports.default = deleteTransactionHelper;
