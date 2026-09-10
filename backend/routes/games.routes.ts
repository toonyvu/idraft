import { Router } from "express";
import {
  createGameController,
  getMatchGamesController,
} from "../controllers/games.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();
router.use(authenticateToken);

router.get("/get", getMatchGamesController);
router.post("/create", createGameController);

export default router;
