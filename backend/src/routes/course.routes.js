import { Router } from "express";
import { verifyToken, requireRole } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createCourseSchema, updateCourseSchema } from "../validations/course.validation.js";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/course.controller.js";

const router = Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Admin-only routes
router.post("/", verifyToken, requireRole("admin"), validate(createCourseSchema), createCourse);
router.patch("/:id", verifyToken, requireRole("admin"), validate(updateCourseSchema), updateCourse);
router.delete("/:id", verifyToken, requireRole("admin"), deleteCourse);

export default router;