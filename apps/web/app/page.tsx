"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// todo 1. install tailwindcsss

const Page = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-4">
        <input
          value={roomId || ""}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Enter Room ID..."
        />

        <button onClick={() => router.push(`/room/${roomId}`)}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Page;
