import { Router } from "express";
import deleteTransaction from "../controllers/deleteTransaction";
import getTransactions from "../controllers/getTransactions";

const router = Router();

router.get("/", getTransactions);
router.delete("/delete", deleteTransaction);

export default router;
