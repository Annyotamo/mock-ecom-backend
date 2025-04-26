import { Router } from "express";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import productUpload from "../controllers/productUpload.js";
import deleteProduct from "../controllers/deleteProduct.js";

dotenv.config();
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), productUpload);
router.delete("/delete", deleteProduct);

export default router;
