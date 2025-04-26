import { Request, Response } from "express";
import transactionModel from "../models/transaction.model";

export default async function getTransactions(req: Request, res: Response) {
    const transactions = await transactionModel.find({});
    res.json(transactions);
    return;
}
