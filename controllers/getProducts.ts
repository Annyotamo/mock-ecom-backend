import AWS from "aws-sdk";
import dotenv from "dotenv";
import productData from "../models/productData.model.js";
import { Response, Request } from "express";

dotenv.config();

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
    region: process.env.AWS_REGION,
});

export default async function getProducts(req: Request, res: Response) {
    const dataInfo = await productData.find({});
    res.json(dataInfo);
}
