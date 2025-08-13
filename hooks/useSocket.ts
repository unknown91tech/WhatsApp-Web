
'use client';

import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { socketService } from '@/lib/socket';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return {
    socket: socketRef.current,
    emit: socketService.emit.bind(socketService),
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
    onNewMessage: socketService.onNewMessage.bind(socketService),
    onMessageStatusUpdate: socketService.onMessageStatusUpdate.bind(socketService),
    onConversationUpdate: socketService.onConversationUpdate.bind(socketService),
    emitNewMessage: socketService.emitNewMessage.bind(socketService),
    emitTyping: socketService.emitTyping.bind(socketService),
  };
}