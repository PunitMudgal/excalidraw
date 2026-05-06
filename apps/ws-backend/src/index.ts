import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/database/client";


const wss = new WebSocketServer({ port: 8001 });

interface User {
  ws: WebSocket;
  rooms: string[];  // stores numeric room IDs as strings e.g. "1", "2"
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || typeof decoded === "string" || !("userId" in decoded)) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

/**
 * Accepts either a numeric room ID ("1") or a room slug ("punit").
 * Returns the numeric room ID as a string, or null if the room doesn't exist.
 */
async function resolveRoomId(roomIdentifier: string): Promise<string | null> {
  const numeric = Number(roomIdentifier);
  if (Number.isInteger(numeric) && numeric > 0) {
    return String(numeric);
  }
  // It's a slug — look up the real id
  const room = await prismaClient.room.findFirst({
    where: { slug: roomIdentifier },
    select: { id: true },
  });
  return room ? String(room.id) : null;
}

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
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    let parsedData: any;

    // --- Parse ---
    try {
      const raw = typeof data !== "string" ? data.toString() : data;
      parsedData = JSON.parse(raw);
    } catch (error) {
      const parseMessage =
        error instanceof Error ? error.message : "Malformed websocket payload";
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Invalid JSON payload: ${parseMessage}`,
        }),
      );
      return;
    }

    // --- join_room ---
    if (parsedData.type === "join_room") {
      try {
        const roomId = await resolveRoomId(String(parsedData.roomId));
        if (!roomId) {
          ws.send(JSON.stringify({ type: "error", message: `Room "${parsedData.roomId}" not found` }));
          return;
        }
        const user = users.find((x) => x.ws === ws);
        if (user && !user.rooms.includes(roomId)) {
          user.rooms.push(roomId);
        }
        console.log("users array in memory: ", users);
      } catch (err) {
        console.error("Error joining room:", err);
        ws.send(JSON.stringify({ type: "error", message: "Failed to join room" }));
      }
    }

    // --- leave_room ---
    if (parsedData.type === "leave_room") {
      try {
        const roomId = await resolveRoomId(String(parsedData.roomId));
        const user = users.find((x) => x.ws === ws);
        if (!user || !roomId) return;
        user.rooms = user.rooms.filter((x) => x !== roomId);
      } catch (err) {
        console.error("Error leaving room:", err);
      }
    }

    // --- chat ---
    if (parsedData.type === "chat") {
      try {
        const message = parsedData.message;
        const rawRoomId = parsedData.roomId;

        if (!message || typeof message !== "string") {
          ws.send(JSON.stringify({ type: "error", message: "Invalid message" }));
          return;
        }
        if (!rawRoomId || typeof rawRoomId !== "string") {
          ws.send(JSON.stringify({ type: "error", message: "Invalid roomId" }));
          return;
        }

        // Resolve slug OR numeric id → numeric string
        const roomId = await resolveRoomId(rawRoomId);
        if (!roomId) {
          ws.send(JSON.stringify({ type: "error", message: `Room "${parsedData.roomId}" not found` }));
          return;
        }

        const numericRoomId = Number(roomId);

        // Broadcast to everyone in the room
        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({ type: "chat", message, roomId }),
            );
          }
        });

        // Persist to DB
        await prismaClient.chat.create({
          data: { message, roomId: numericRoomId, userId },
        });
        console.log("chat saved, users: ", users);
      } catch (err) {
        console.error("Error handling chat message:", err);
        ws.send(JSON.stringify({ type: "error", message: "Failed to send message" }));
      }
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((x) => x.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});


