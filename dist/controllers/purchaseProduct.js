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
const purchaseProduct_service_1 = __importDefault(require("../services/purchaseProduct.service"));
function purchaseProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactionData = yield (0, purchaseProduct_service_1.default)(req, res);
            if (!transactionData) {
                res.status(statusCodes_1.StatusCodes.BAD_REQUEST).json({ message: statusCodes_1.StatusMessages[statusCodes_1.StatusCodes.BAD_REQUEST] });
                return;
            }
            res.status(statusCodes_1.StatusCodes.ACCEPTED).json(transactionData);
            return;
        }
        catch (error) {
            console.log("Error in product transaction:", error);
            res.status(statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: statusCodes_1.StatusMessages[statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR],
            });
        }
    });
}
exports.default = purchaseProduct;
