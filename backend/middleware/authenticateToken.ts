import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Authenticated required.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: number;
      username: string;
    };

    req.user = decoded;
    next();
  } catch {
    console.log("❌ JWT verification failed:");
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
