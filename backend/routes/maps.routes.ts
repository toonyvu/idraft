import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getAllMapsController } from "../controllers/maps.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/get", getAllMapsController);

export default router;
