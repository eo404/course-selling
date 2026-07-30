import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { enrollSchema } from "../validations/enrollment.validation.js";
import {
    enrollInCourse,
    getMyEnrollments,
    checkEnrollment,
} from "../controllers/enrollment.controller.js";

const router = Router();

router.post("/:courseId", verifyToken, validate(enrollSchema), enrollInCourse);
router.get("/my-courses", verifyToken, getMyEnrollments);
router.get("/:courseId/status", verifyToken, checkEnrollment);

export default router;