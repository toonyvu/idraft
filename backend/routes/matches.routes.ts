import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getMatchesFromTournamentController } from "../controllers/matches.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getMatchesFromTournamentController);

export default router;
