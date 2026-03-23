import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8001 });

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const token = urlParams.get("token") || "";
  if (!token) {
    return;
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
    return;
  }
  const email = decoded.email;

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Hello from server: ${message}`);
  });
});
