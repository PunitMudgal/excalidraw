"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const ChatRoomClient = ({
  messages,
  roomSlug,
}: {
  messages: { message: string }[];
  roomSlug: string;
}) => {
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();
  const [currentMessage, setCurrentMessage] = useState("");
  const [socketError, setSocketError] = useState<string | null>(null);

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomSlug,
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          setChats((prev) => [...prev, { message: data.message }]);
        }
        if (data.type === "error") {
          setSocketError(data.message ?? "WebSocket error");
        }
      };
      setSocketError(null);
    } else if (!loading && !socket) {
      setSocketError("Socket not connected. Open room with ?token=YOUR_JWT_TOKEN.");
    }
  }, [socket, loading, roomSlug]);

  return (
    <div>
      <h1>ChatRoomClient</h1>
      <div>
        {chats.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}

        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          onClick={() => {
            if (!socket) {
              setSocketError(
                "Socket not connected. Open room with ?token=YOUR_JWT_TOKEN.",
              );
              return;
            }
            if (!currentMessage.trim()) {
              return;
            }
            socket?.send(
              JSON.stringify({
                type: "chat",
                message: currentMessage.trim(),
                roomId: roomSlug,
              }),
            );
            setCurrentMessage("");
          }}
          disabled={loading || !socket}
        >
          Send
        </button>
        {loading && <div>Loading...</div>}
        {socketError && <div>{socketError}</div>}
      </div>
    </div>
  );
};

export default ChatRoomClient;
