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
const statusCodes_js_1 = require("../utils/statusCodes.js");
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
function registerUserHelper(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, phone, password, role = ["user"] } = req.body;
            if (!phone || !password || !name) {
                return {
                    status: statusCodes_js_1.StatusCodes.BAD_REQUEST,
                    data: {
                        success: false,
                        message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.BAD_REQUEST],
                    },
                };
            }
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                return {
                    status: statusCodes_js_1.StatusCodes.BAD_REQUEST,
                    data: {
                        success: false,
                        message: "Enter a 10 digit phone number",
                    },
                };
            }
            const existingUser = yield user_model_js_1.default.findOne({ phone });
            if (existingUser) {
                return {
                    status: statusCodes_js_1.StatusCodes.BAD_REQUEST,
                    data: {
                        success: false,
                        message: "Pre-existing phone number",
                    },
                };
            }
            const user = yield user_model_js_1.default.create({
                name,
                phone,
                password,
                role,
            });
            return {
                status: statusCodes_js_1.StatusCodes.CREATED,
                data: {
                    success: true,
                    message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.CREATED],
                    user: {
                        id: user._id,
                        phone: user.phone,
                        role: user.role,
                    },
                },
            };
        }
        catch (error) {
            console.error("Registration error:", error);
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
exports.default = registerUserHelper;
