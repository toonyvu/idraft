import { Router } from "express";
import {
  getTeamPlayersController,
  insertTeamPlayerController,
} from "../controllers/players.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.use(authenticateToken);

router.get("/get", getTeamPlayersController);
router.post("/new", insertTeamPlayerController);

export default router;
