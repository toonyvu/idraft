import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/authenticateToken.js";
import { getTournamentMaps } from "../services/maps.service.js";

export async function getAllMapsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const maps = await getTournamentMaps();

    return res.status(200).json(maps);
  } catch (err) {
    next(err);
  }
}
