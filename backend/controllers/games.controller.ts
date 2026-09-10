import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import { createGame, getMatchGames } from "../services/games.service.js";

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

export async function createGameController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { matchId } = req.query;
  const { game } = req.body;

  try {
    if (!matchId || !game) {
      throw new Error("MatchId or Game information not found.");
    }

    await createGame(game, Number(matchId));
    return res
      .status(201)
      .json({ message: "Game created successfully!", success: true });
  } catch (err) {
    next(err);
  }
}
