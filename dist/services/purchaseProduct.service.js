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
const productData_model_1 = __importDefault(require("../models/productData.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const statusCodes_1 = require("../utils/statusCodes");
const mongoose_1 = __importDefault(require("mongoose"));
function purchaseProductHelper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            if (!id) {
                return {
                    status: statusCodes_1.StatusCodes.BAD_REQUEST,
                    data: { success: false, message: "Product ID is required." },
                };
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return {
                    status: statusCodes_1.StatusCodes.BAD_REQUEST,
                    data: { success: false, message: "Invalid product ID format." },
                };
            }
            const productData = yield productData_model_1.default.findById(id);
            if (!productData) {
                return {
                    status: statusCodes_1.StatusCodes.NOT_FOUND,
                    data: { success: false, message: "Product not found." },
                };
            }
            const { name, price } = productData;
            const newTransaction = yield transaction_model_1.default.create({
                productId: id,
                productName: name,
                productPrice: price,
            });
            const transactionData = yield newTransaction.save();
            return {
                status: statusCodes_1.StatusCodes.ACCEPTED,
                data: {
                    success: true,
                    message: "Purchased product successfully",
                    transaction: transactionData,
                },
            };
        }
        catch (error) {
            console.error("Error in product transaction:", error);
            return {
                status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "An error occurred during the purchase process.",
                },
            };
        }
    });
}
exports.default = purchaseProductHelper;
