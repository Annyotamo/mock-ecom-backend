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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const promises_1 = __importDefault(require("fs/promises"));
const dotenv_1 = __importDefault(require("dotenv"));
const productData_model_js_1 = __importDefault(require("../models/productData.model.js"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_REGION,
});
function productUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price, s3Url, s3FileName } = req.body;
        if (!name || !description || !price || s3Url || s3FileName) {
            res.status(400).json({ message: "Please provide name, description, and price." });
            return; // Important:  Return here
        }
        if (!req.file) {
            res.status(400).send("No file uploaded.");
            return; // Important: Return here
        }
        try {
            const fileContent = yield promises_1.default.readFile(req.file.path);
            const key = `uploads/${req.file.filename}`;
            const params = {
                Bucket: "mock-ecom",
                Key: key,
                Body: fileContent,
                ContentType: req.file.mimetype,
            };
            const data = yield s3.upload(params).promise();
            const newProduct = new productData_model_js_1.default({
                name,
                description,
                price,
                s3FileName: req.file.filename,
                s3Url: data.Location,
            });
            const savedProduct = yield newProduct.save();
            yield promises_1.default.unlink(req.file.path);
            res.status(200).send({
                message: "Product successfully created",
                product: savedProduct,
            });
        }
        catch (error) {
            console.error("Error uploading to S3:", error);
            if (req.file && req.file.path) {
                yield promises_1.default.unlink(req.file.path);
            }
            res.status(500).send("Error uploading file to S3.");
        }
    });
}
exports.default = productUpload;
