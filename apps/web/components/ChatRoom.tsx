import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  return response.data;
}

const ChatRoom = async ({ id, roomSlug }: { id: string; roomSlug: string }) => {
  const chats = await getChats(id);

  return <ChatRoomClient messages={chats.chats} roomSlug={roomSlug} />;
};

export default ChatRoom;
