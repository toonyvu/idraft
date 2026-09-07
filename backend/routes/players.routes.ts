import { Router } from "express";
import {
  deleteTeamPlayerController,
  getTeamPlayersController,
  insertTeamPlayerController,
} from "../controllers/players.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.use(authenticateToken);

router.get("/get", getTeamPlayersController);
router.post("/new", insertTeamPlayerController);
router.delete("/delete", deleteTeamPlayerController);

export default router;
