import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  getTeamsFromTournamentController,
  createTeamFromTournamentController,
  getTeamFromTournamentController,
  deleteTeamFromTournamentController,
} from "../controllers/teams.controller.js";
const router = Router();
router.use(authenticateToken);

router.get("/", getTeamsFromTournamentController);
router.post("/add", createTeamFromTournamentController);
router.get("/manage", getTeamFromTournamentController);
router.delete("/delete", deleteTeamFromTournamentController);

export default router;
