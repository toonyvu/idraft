import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();
router.use(authenticateToken);

router.get("/");
