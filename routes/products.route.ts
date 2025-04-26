import { Router } from "express";
import getProducts from "../controllers/getProducts.js";
import purchaseProduct from "../controllers/purchaseProduct.js";

const router = Router();

router.get("/", getProducts);
router.get("/purchase", purchaseProduct);

export default router;
