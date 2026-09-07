import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  createTournamentMatchController,
  getMatchesFromTournamentController,
  getTournamentMatchController,
} from "../controllers/matches.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getMatchesFromTournamentController);
router.post("/create", createTournamentMatchController);
router.get("/:id", getTournamentMatchController);

export default router;
