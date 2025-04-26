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
const statusCodes_1 = require("../utils/statusCodes");
const mongoose_1 = __importDefault(require("mongoose"));
function deleteProductHelper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return {
                status: statusCodes_1.StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: "Invalid product ID format.",
                },
            };
        }
        try {
            const existingProduct = yield productData_model_1.default.findById(id);
            if (!existingProduct) {
                return {
                    status: statusCodes_1.StatusCodes.NOT_FOUND,
                    data: {
                        success: false,
                        message: "Product not found.",
                    },
                };
            }
            const deletedProduct = yield productData_model_1.default.deleteOne({ _id: id });
            if (deletedProduct.deletedCount > 0) {
                return {
                    status: statusCodes_1.StatusCodes.ACCEPTED,
                    data: {
                        success: true,
                        message: "Product deleted successfully",
                    },
                };
            }
            else {
                return {
                    status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    data: {
                        success: false,
                        message: "Failed to delete product.",
                    },
                };
            }
        }
        catch (error) {
            console.error("Error deleting product:", error);
            return {
                status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "An error occurred while deleting the product.",
                },
            };
        }
    });
}
exports.default = deleteProductHelper;
