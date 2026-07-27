import express from "express";

import validate from "../middleware/validate.middleware.js";
import {
  userSchema,
  userLoginSchema,
} from "../validations/user.validation.js";
import {
  registerUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate(userSchema),
  registerUser
);

router.post(
  "/login",
  validate(userLoginSchema),
  loginUser
);

export default router;