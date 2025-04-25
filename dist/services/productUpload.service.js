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
exports.productUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const promises_1 = __importDefault(require("fs/promises"));
const productData_model_1 = __importDefault(require("../models/productData.model"));
const statusCodes_1 = require("../utils/statusCodes");
const s3 = new aws_sdk_1.default.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_REGION,
});
function uploadToS3(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContent = yield promises_1.default.readFile(file.path);
            const key = `uploads/${file.filename}`;
            const params = {
                Bucket: "mock-ecom",
                Key: key,
                Body: fileContent,
                ContentType: file.mimetype,
            };
            const data = yield s3.upload(params).promise();
            yield promises_1.default.unlink(file.path);
            return { s3Url: data.Location, s3FileName: file.filename };
        }
        catch (error) {
            console.error("Error uploading to S3:", error);
            if (file && file.path) {
                yield promises_1.default.unlink(file.path);
            }
            throw new Error("Error uploading file to S3.");
        }
    });
}
function productUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            res.status(statusCodes_1.StatusCodes.BAD_REQUEST).json({ message: statusCodes_1.StatusMessages[statusCodes_1.StatusCodes.BAD_REQUEST] });
            return;
        }
        if (!req.file) {
            res.status(400).send("No file uploaded.");
            return;
        }
        try {
            const { s3Url, s3FileName } = yield uploadToS3(req.file);
            const newProduct = new productData_model_1.default({
                name,
                description,
                price,
                s3FileName,
                s3Url,
            });
            const savedProduct = yield newProduct.save();
            res.status(200).send({
                message: "Product successfully created",
                product: savedProduct,
            });
        }
        catch (error) {
            console.error("Error in productUpload:", error.message);
            res.status(500).send(error.message);
        }
    });
}
exports.productUpload = productUpload;
