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
const statusCodes_js_1 = require("../utils/statusCodes.js");
const registerUser_service_js_1 = __importDefault(require("../services/registerUser.service.js"));
const loginUser_service_js_1 = __importDefault(require("../services/loginUser.service.js"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield (0, registerUser_service_js_1.default)(req, res);
        res.status(statusCodes_js_1.StatusCodes.ACCEPTED).json(newUser);
        return;
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phone, password } = req.body;
        try {
            const loggedInUser = yield (0, loginUser_service_js_1.default)(phone, password);
            if (loggedInUser) {
                res.status(statusCodes_js_1.StatusCodes.OK).json(loggedInUser);
                return;
            }
            else {
                res.status(statusCodes_js_1.StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
                return;
            }
        }
        catch (error) {
            console.error("Login controller error:", error);
            res.status(statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: statusCodes_js_1.StatusMessages[statusCodes_js_1.StatusCodes.INTERNAL_SERVER_ERROR],
            });
            return;
        }
    });
}
exports.loginUser = loginUser;
