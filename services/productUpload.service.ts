import AWS from "aws-sdk";
import fs from "fs/promises";
import { Request, Response } from "express";
import Data from "../models/productData.model";
import { StatusCodes, StatusMessages } from "../utils/statusCodes";

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
    region: process.env.AWS_REGION,
});

interface UploadResult {
    s3Url: string;
    s3FileName: string;
}

async function uploadToS3(file: Express.Multer.File): Promise<UploadResult> {
    try {
        const fileContent = await fs.readFile(file.path);
        const key = `uploads/${file.filename}`;

        const params = {
            Bucket: "mock-ecom",
            Key: key,
            Body: fileContent,
            ContentType: file.mimetype,
        };

        const data = await s3.upload(params).promise();
        await fs.unlink(file.path);
        return { s3Url: data.Location, s3FileName: file.filename };
    } catch (error) {
        console.error("Error uploading to S3:", error);
        if (file && file.path) {
            await fs.unlink(file.path);
        }
        throw new Error("Error uploading file to S3.");
    }
}

export async function productUpload(req: Request, res: Response): Promise<void> {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: StatusMessages[StatusCodes.BAD_REQUEST] });
        return;
    }

    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    try {
        const { s3Url, s3FileName } = await uploadToS3(req.file);

        const newProduct = new Data({
            name,
            description,
            price,
            s3FileName,
            s3Url,
        });
        const savedProduct = await newProduct.save();

        res.status(200).send({
            message: "Product successfully created",
            product: savedProduct,
        });
    } catch (error: any) {
        console.error("Error in productUpload:", error.message);
        res.status(500).send(error.message);
    }
}
