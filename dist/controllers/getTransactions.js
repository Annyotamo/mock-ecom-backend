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
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../utils/statusCodes");
const getTransactions_service_1 = require("../services/getTransactions.service");
function getTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactionsResult = yield (0, getTransactions_service_1.getTransactionsHelper)();
            res.status(transactionsResult.status).json(transactionsResult.data);
            return;
        }
        catch (error) {
            console.error("Error in getTransactions controller:", error);
            res.status(statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: statusCodes_1.StatusMessages[statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR],
            });
            return;
        }
    });
}
exports.default = getTransactions;
