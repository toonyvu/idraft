import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  getAllTournamentsController,
  createNewTournamentController,
  getTournamentByIdController,
} from "../controllers/tournaments.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getAllTournamentsController);
router.post("/create", createNewTournamentController);

router.get("/:id", getTournamentByIdController);

export default router;
