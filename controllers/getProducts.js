import AWS from "aws-sdk";
import dotenv from "dotenv";
import productData from "../models/productData.model.js";

dotenv.config();
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_REGION,
});

export default async function getProducts(req, res) {
    let products = [];
    const dataInfo = await productData.find({});
    console.log(dataInfo);
    res.json({ message: "Working!" });
}
