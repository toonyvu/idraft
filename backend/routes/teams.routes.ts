import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  getTeamsFromTournamentController,
  createTeamFromTournamentController,
  getTeamFromTournamentController,
} from "../controllers/teams.controller.js";
const router = Router();
router.use(authenticateToken);

router.get("/", getTeamsFromTournamentController);
router.post("/add", createTeamFromTournamentController);
router.get("/manage", getTeamFromTournamentController);

export default router;
