import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import {
  createTournamentMatch,
  getAllMatchesFromTournament,
  getMatchFromTournament,
} from "../services/matches.service.js";

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

export async function createTournamentMatchController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { tournamentId } = req.query;
  const { teamIds, bestOf } = req.body;

  try {
    if (!tournamentId || !teamIds || !bestOf) {
      throw new Error("TournamentId or TeamIds or BestOf not found.");
    }

    await createTournamentMatch(Number(tournamentId), Number(bestOf), teamIds);
    return res.status(200).json({ message: "Match created successfully!" });
  } catch (err) {
    next(err);
  }
}

export async function getTournamentMatchController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  const { tournamentId } = req.query;

  try {
    if (!id || !tournamentId) {
      throw new Error("TournamentId or MatchId not found.");
    }

    const matchInfo = await getMatchFromTournament(
      Number(tournamentId),
      Number(id),
    );
    return res.status(200).json(matchInfo);
  } catch (err) {
    next(err);
  }
}
