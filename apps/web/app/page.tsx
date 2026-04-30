"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// todo 1. install tailwindcsss

const page = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <input
        value={roomId || ""}
        onChange={(e) => setRoomId(e.target.value)}
        type="text"
        placeholder="Enter Room ID..."
      />

      <button onClick={() => router.push(`/room/${roomId}`)}>Join Room</button>
    </div>
  );
};

export default page;
