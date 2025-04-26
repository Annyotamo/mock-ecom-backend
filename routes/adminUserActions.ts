import { Router } from "express";
import deleteUser from "../controllers/deleteUser";

const router = Router();

router.delete("/delete", deleteUser);

export default router;
