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

async function uploadToS3(
    file: Express.Multer.File
): Promise<{ success: boolean; message: string; data?: UploadResult }> {
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
        return {
            success: true,
            message: "File uploaded to S3 successfully.",
            data: { s3Url: data.Location, s3FileName: file.filename },
        };
    } catch (error: any) {
        console.error("Error uploading to S3:", error);
        if (file && file.path) {
            await fs.unlink(file.path);
        }
        return { success: false, message: "Error uploading file to S3." };
    }
}

export async function productUpload(req: Request, res: Response): Promise<void> {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: StatusMessages[StatusCodes.BAD_REQUEST],
        });
        return;
    }

    if (!req.file) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "No file uploaded.",
        });
        return;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Only image files (jpeg, png, gif, webp) are allowed.",
        });
        return;
    }

    try {
        const uploadResult = await uploadToS3(req.file);

        if (!uploadResult.success) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: uploadResult.message,
            });
            return;
        }

        const { s3Url, s3FileName } = uploadResult.data!;

        const newProduct = new Data({
            name,
            description,
            price,
            s3FileName,
            s3Url,
        });
        const savedProduct = await newProduct.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Product successfully created",
            product: savedProduct,
        });
    } catch (error: any) {
        console.error("Error in productUpload:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
}
