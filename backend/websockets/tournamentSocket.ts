import { WebSocketServer } from "ws";
export function setupTournamentSocket(wss: WebSocketServer) {
  wss.on("connection", (ws) => {
    console.log("Client Connected");

    ws.on("message", async (data) => {
      const message = JSON.parse(data.toString());
    });
  });
}
