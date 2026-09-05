import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import {
  getAllTournaments,
  createNewTournament,
  getTournamentById,
  deleteTournament,
} from "../services/tournaments.service.js";

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

export async function createNewTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  console.log("Controller reached");
  const { name, description } = req.body;
  const userId = req.user!.userId;
  try {
    const tournament = await createNewTournament(
      name,
      description,
      Number(userId),
    );
    return res.status(200).json(tournament);
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function getTournamentByIdController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  try {
    const tournament = await getTournamentById(Number(id));
    return res.status(200).json(tournament);
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function deleteTournamentController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { tournamentId } = req.query;
  console.log(tournamentId);
  try {
    if (!tournamentId) {
      throw new Error("Failure to delete tournament.");
    }
    await deleteTournament(Number(tournamentId));
    return res.status(200).json({ message: "Deleted tournament." });
  } catch (err) {
    next(err);
  }
}
