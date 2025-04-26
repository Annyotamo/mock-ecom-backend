import { Router } from "express";
import getProducts from "../controllers/getProducts.js";
import purchaseProduct from "../controllers/purchaseProduct.js";
import { authenticateToken } from "../config/auth.js";

const router = Router();

router.get("/all", getProducts);
router.get("/purchase", authenticateToken, purchaseProduct);

export default router;
