import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../app/config";

export async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  return response.data;
}

const ChatRoom = async ({ id }: { id: string }) => {
  const chats = await getChats(id);
  return <div>ChatRoom</div>;
};
