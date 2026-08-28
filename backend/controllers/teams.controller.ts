import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";

import {
  getTeamsFromTournament,
  insertTeamToTournament,
} from "../services/teams.service.js";

export async function getTeamsFromTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { tournamentId } = req.query;
  const userId = req.user?.userId;
  try {
    const teams = await getTeamsFromTournament(Number(tournamentId), userId);
    return res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function createTeamFromTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { tournamentId } = req.query;
    const userId = req.user?.userId;
    const team = req.body;

    if (!tournamentId || !userId) {
      throw new Error("TournamentId or user not found");
    }

    await insertTeamToTournament(Number(tournamentId), team, userId);

    return res.status(201).json({
      message: "Team added successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
