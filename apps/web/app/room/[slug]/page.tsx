import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoom(slug: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room: ", error);
    return null;
  }
}

async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getRoom(slug);

  if (!data || !data.room) {
    return <div>Room not found.</div>;
  }

  const { room } = data;

  return (
    <div>
      <h1>
        {/* {room.name} */}
        <ChatRoom id={room.id} roomSlug={slug} />
      </h1>
    </div>
  );
}

export default RoomPage;
