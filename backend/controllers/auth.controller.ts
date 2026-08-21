import type { Request, Response } from "express";
import { signup } from "../services/auth.service.js";

export async function signupController(req: Request, res: Response) {
  const { email, username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid data sent." });
    }
    const result = await signup(email, username, password);

    return res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}
