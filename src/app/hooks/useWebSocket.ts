import { useEffect, useRef } from 'react';

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Ne créer la connexion que si la page est active
    if (document.visibilityState === 'visible') {
      ws.current = new WebSocket(url);
      
      return () => {
        ws.current?.close();
      };
    }
  }, [url]);

  // Reconnecter lors du retour sur la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !ws.current) {
        ws.current = new WebSocket(url);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [url]);

  return ws.current;
} 