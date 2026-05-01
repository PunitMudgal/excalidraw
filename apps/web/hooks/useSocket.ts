import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../app/config";

export const useSocket = () => {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(WS_BACKEND_URL);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    loading,
    socket,
  };
};
