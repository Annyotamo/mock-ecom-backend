import { Router } from "express";
import deleteTransaction from "../controllers/deleteTransaction";
import getTransactions from "../controllers/getTransactions";

const router = Router();

router.get("/all", getTransactions);
router.delete("/delete", deleteTransaction);

export default router;
