import type { NextFunction, Request, Response } from "express";
import { getCharactersService } from "../services/characters.service.js";

export async function getCharactersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { role } = req.query;

  console.log("Controller reached");
  if (typeof role !== "string") {
    return res
      .status(400)
      .json({ message: "Role is required and must be a string." });
  }

  try {
    const characers = await getCharactersService(role);
    return res.status(200).json(characers);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
