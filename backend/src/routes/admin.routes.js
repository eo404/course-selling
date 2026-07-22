import { Router } from "express";
import validate from "../middleware/validate.middleware.js";
import { adminRegisterSchema, adminLoginSchema } from "../validations/admin.validation.js";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post("/register", validate(adminRegisterSchema), registerAdmin);
router.post("/login", validate(adminLoginSchema), loginAdmin);

export default router;