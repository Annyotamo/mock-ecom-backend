import { Router } from "express";
import getProducts from "../controllers/getProducts.js";

const router = Router();

router.get("/", getProducts);

export default router;
