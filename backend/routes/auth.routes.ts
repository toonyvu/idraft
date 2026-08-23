import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.get("/me", authenticateToken, getCurrentUserController);

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
