import { Router } from "express";
import { getMatchGamesController } from "../controllers/games.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();
router.use(authenticateToken);

router.get("/get", getMatchGamesController);

export default router;
