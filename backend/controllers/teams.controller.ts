import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";

import {
  deleteTeamFromTournament,
  getTeamFromTournament,
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

export async function getTeamFromTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { tournamentId, teamId } = await req.query;
    if (!tournamentId || !teamId) {
      throw new Error("Tournament or TeamId not found.");
    }

    const team = await getTeamFromTournament(
      Number(tournamentId),
      Number(teamId),
    );

    return res.status(201).json(team);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteTeamFromTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { tournamentId, teamId } = await req.query;
    if (!tournamentId || !teamId) {
      throw new Error("Tournament or TeamId not found.");
    }

    await deleteTeamFromTournament(Number(teamId), Number(tournamentId));

    return res.status(200).json({ message: "Team deleted." });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
