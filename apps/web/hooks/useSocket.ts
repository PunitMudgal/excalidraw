import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../app/config";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
    ws.onerror = () => {
      setLoading(false);
    };
    return () => {
      ws.close();
    };
  }, []);

  return {
    loading,
    socket,
  } as { loading: boolean; socket: WebSocket | null };
};
