import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

async function getRoom(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data;
}

async function RoomPage({ params }: { params: { slug: string } }) {
  const roomId = await getRoom(params.slug);

  return (
    <div>
      <h1>{roomId}</h1>
    </div>
  );
}

export default RoomPage;
