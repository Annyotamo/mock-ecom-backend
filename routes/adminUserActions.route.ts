import { Router } from "express";
import deleteUser from "../controllers/deleteUser";
import provideAdminAccess from "../controllers/provideAdminAccess";
import viewUsers from "../controllers/viewUsers";
import revokeAdminAccess from "../controllers/revokeAdminAccess";

const router = Router();

router.get("/all", viewUsers);
router.delete("/delete", deleteUser);
router.post("/admin-access", provideAdminAccess);
router.post("/revoke-admin-access", revokeAdminAccess);

export default router;
