import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
