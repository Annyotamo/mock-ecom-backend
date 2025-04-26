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
exports.getTransactionsHelper = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const statusCodes_1 = require("../utils/statusCodes");
function getTransactionsHelper() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield transaction_model_1.default.find({});
            return {
                status: statusCodes_1.StatusCodes.OK,
                data: {
                    success: true,
                    message: "Transactions retrieved successfully.",
                    transactions,
                },
            };
        }
        catch (error) {
            console.error("Error fetching transactions:", error.message);
            return {
                status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "Failed to retrieve transactions.",
                },
            };
        }
    });
}
exports.getTransactionsHelper = getTransactionsHelper;
