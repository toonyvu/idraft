import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signup, login } from "../services/auth.service.js";

export async function loginController(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    console.log(username, password);
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid data sent." });
    }

    const user = await login(username, password);

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

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

export async function logoutController(req: Request, res: Response) {
  res.clearCookie("accessToken");

  return res.status(200).json({ message: "Logged out successfully." });
}
