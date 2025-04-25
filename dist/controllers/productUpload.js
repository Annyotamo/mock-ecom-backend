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
const statusCodes_js_1 = require("../utils/statusCodes.js");
const productUpload_service_1 = require("../services/productUpload.service");
function productUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productUploadData = yield (0, productUpload_service_1.productUpload)(req, res);
        res.status(statusCodes_js_1.StatusCodes.ACCEPTED).json(productUploadData);
        return;
    });
}
exports.default = productUpload;
