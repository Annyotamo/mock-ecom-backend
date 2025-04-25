import { Schema, model, Document } from "mongoose";

export interface Product extends Document {
    name: String;
    description: String;
    price: Number;
    s3Url: String;
    s3FileName: String;
}

interface ProductDocument extends Product, Document {}

const productDataSchema = new Schema<Product>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        s3Url: {
            type: String,
            required: true,
        },
        s3FileName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Product>("Data", productDataSchema);
