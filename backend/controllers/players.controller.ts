import {
  getPlayersFromTeam,
  insertTeamPlayer,
} from "../services/players.service.js";
import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";

export async function getTeamPlayersController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.userId;
  const { teamId } = await req.query;

  console.log(userId, teamId);
  try {
    if (!teamId || !userId) {
      throw new Error("TeamId or UserId not found.");
    }

    const players = await getPlayersFromTeam(Number(teamId), Number(userId));

    return res.status(200).json(players);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function insertTeamPlayerController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.userId;
  const { teamId } = await req.query;
  const { name, role } = req.body;

  try {
    if (!teamId || !userId) {
      throw new Error("teamId or userId not found.");
    }

    const plrName = await insertTeamPlayer(Number(teamId), userId, role, name);
    return res.status(200).json(plrName);
  } catch (err) {
    next(err);
  }
}
