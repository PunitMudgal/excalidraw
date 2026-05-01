"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const ChatRoomClient = ({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) => {
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }),
      );

      socket.onmessage = (event) => {
        console.log("event: ", event);
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          setChats((prev) => [...prev, data.message]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      <h1>ChatRoomClient</h1>
      <div>
        {messages.map((message) => (
          <div key={message.message}>{message.message}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomClient;
