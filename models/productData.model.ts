import { Schema, model } from "mongoose";

const productDataSchema = new Schema(
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

export default model("Data", productDataSchema);
