import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getAllTournamentsController } from "../controllers/tournaments.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getAllTournamentsController);

export default router;
