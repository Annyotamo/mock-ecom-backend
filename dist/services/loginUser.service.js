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
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_js_1 = require("../config/auth.js");
const statusCodes_js_1 = require("../utils/statusCodes.js");
function loginUserHelper(phone, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_js_1.default.findOne({ phone: phone }).select("+password");
            if (!user) {
                return {
                    status: statusCodes_js_1.StatusCodes.BAD_REQUEST,
                    data: {
                        success: false,
                        message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.BAD_REQUEST],
                    },
                };
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    status: statusCodes_js_1.StatusCodes.UNAUTHORIZED,
                    data: {
                        success: false,
                        message: "Invalid credentials",
                    },
                };
            }
            const token = (0, auth_js_1.generateToken)({ id: user._id, phone: user.phone, role: user.role });
            return {
                status: statusCodes_js_1.StatusCodes.OK,
                data: {
                    success: true,
                    id: user._id,
                    token: token,
                },
            };
        }
        catch (error) {
            console.error("Login service error:", error);
            return {
                status: statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {
                    success: false,
                    message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR],
                },
            };
        }
    });
}
exports.default = loginUserHelper;
