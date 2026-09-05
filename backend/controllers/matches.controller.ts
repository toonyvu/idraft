import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import { getAllMatchesFromTournament } from "../services/matches.service.js";

export async function getMatchesFromTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { tournamentId } = req.query;
  try {
    if (!tournamentId) {
      throw new Error("TournamentId not found.");
    }
    const matches = await getAllMatchesFromTournament(Number(tournamentId));
    return res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
}
