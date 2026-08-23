import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import { getAllTournaments } from "../services/tournaments.service.js";

export async function getAllTournamentsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.userId;
  try {
    const tournaments = await getAllTournaments(userId);
    return res.status(200).json(tournaments);
  } catch (err) {
    console.log(err);
    next();
  }
}
