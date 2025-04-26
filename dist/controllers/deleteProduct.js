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
const deleteProduct_service_1 = __importDefault(require("../services/deleteProduct.service"));
const statusCodes_1 = require("../utils/statusCodes");
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const deletedData = yield (0, deleteProduct_service_1.default)(id);
            if (deletedData.status != 200) {
                res.status(deletedData.status).json(deletedData);
                return;
            }
            res.status(deletedData.status).json(deletedData);
            return;
        }
        catch (error) {
            console.log("Error in deleting product:", error);
            res.status(statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: statusCodes_1.StatusMessages[statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR],
            });
            return;
        }
    });
}
exports.default = deleteProduct;
