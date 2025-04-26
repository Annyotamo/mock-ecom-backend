import { model, Schema, Document, Types } from "mongoose";

interface Transaction extends Document {
    productId: Types.ObjectId; // Use ObjectId
    productName: string;
    productPrice: string;
}

const transactionSchema = new Schema<Transaction>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
});

export default model<Transaction>("Transaction", transactionSchema);
