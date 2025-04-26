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
const user_model_1 = __importDefault(require("../models/user.model"));
const statusCodes_1 = require("../utils/statusCodes");
const mongoose_1 = __importDefault(require("mongoose"));
function deleteUserHelper(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return {
                status: statusCodes_1.StatusCodes.BAD_REQUEST,
                data: {
                    success: false,
                    message: "Invalid user ID format.",
                },
            };
        }
        try {
            const existingUser = yield user_model_1.default.findById(id);
            if (!existingUser) {
                return {
                    status: statusCodes_1.StatusCodes.NOT_FOUND,
                    data: {
                        success: false,
                        message: "User not found.",
                    },
                };
            }
            const deletedUser = yield user_model_1.default.deleteOne({ _id: id });
            if (deletedUser.deletedCount > 0) {
                return {
                    status: statusCodes_1.StatusCodes.ACCEPTED,
                    data: {
                        success: true,
                        message: "User deleted successfully",
                    },
                };
            }
            else {
                return {
                    status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    data: {
                        success: false,
                        message: "Failed to delete user.",
                    },
                };
            }
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return {
                status: statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: "An error occurred while deleting the user.",
                },
            };
        }
    });
}
exports.default = deleteUserHelper;
