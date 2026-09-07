import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import { getMatchGames } from "../services/games.service.js";

export async function getMatchGamesController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { matchId } = req.query;

  try {
    if (!matchId) {
      throw new Error("MatchId not found.");
    }

    const games = await getMatchGames(Number(matchId));
    return res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}
