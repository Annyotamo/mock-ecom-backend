import AWS from "aws-sdk";
import fs from "fs/promises";
import dotenv from "dotenv";
import Data from "../models/productData.model.js";
import { Request, Response } from "express";

dotenv.config();
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
    region: process.env.AWS_REGION,
});

export default async function productUpload(req: Request, res: Response): Promise<void> {
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
        const fileContent = await fs.readFile(req.file.path);
        const key = `uploads/${req.file.filename}`;

        const params = {
            Bucket: "mock-ecom",
            Key: key,
            Body: fileContent,
            ContentType: req.file.mimetype,
        };

        const data = await s3.upload(params).promise();
        const newProduct = new Data({
            name,
            description,
            price,
            s3FileName: req.file.filename,
            s3Url: data.Location,
        });
        const savedProduct = await newProduct.save();

        await fs.unlink(req.file.path);

        res.status(200).send({
            message: "Product successfully created",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error uploading to S3:", error);
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path);
        }
        res.status(500).send("Error uploading file to S3.");
    }
}
