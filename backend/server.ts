import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { setupTournamentSocket } from "./websockets/tournamentSocket.js";
import type { Request, Response } from "express";

import characterRoutes from "./routes/character.routes.js";
import authRoutes from "./routes/auth.routes.js";
import tournamentRoutes from "./routes/tournaments.routes.js";

const PORT = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

setupTournamentSocket(wss);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/characters", characterRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/auth", authRoutes);

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
    err,
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
