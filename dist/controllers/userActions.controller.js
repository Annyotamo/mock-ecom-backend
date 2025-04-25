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
exports.loginUser = exports.registerUser = void 0;
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const statusCodes_js_1 = require("../utils/statusCodes.js");
const auth_js_1 = require("../config/auth.js");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, password, role = ["user"] } = req.body;
            if (!phone || !password) {
                res.status(statusCodes_js_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.BAD_REQUEST],
                });
                return;
            }
            const existingUser = yield user_model_js_1.default.findOne({ phone });
            if (existingUser) {
                res.status(statusCodes_js_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.BAD_REQUEST],
                });
                return;
            }
            const user = yield user_model_js_1.default.create({
                phone,
                password,
                role,
            });
            const token = (0, auth_js_1.generateToken)({ id: user._id, phone: user.phone, role: user.role });
            res.status(statusCodes_js_1.StatusCodes.CREATED).json({
                success: true,
                message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.CREATED],
                token,
                user: {
                    id: user._id,
                    phone: user.phone,
                    role: user.role,
                },
            });
        }
        catch (error) {
            console.error("Registration error:", error);
            res.status(statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR],
            });
            return;
        }
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.loginUser = loginUser;
