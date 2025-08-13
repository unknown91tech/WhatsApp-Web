
import { NextRequest } from 'next/server';
import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '@/lib/constants';

declare global {
  var io: Server | undefined;
}

export async function GET(request: NextRequest) {
  if (!global.io) {
    console.log('Initializing Socket.IO server...');
    
    global.io = new Server({
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });

    global.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on(SOCKET_EVENTS.NEW_MESSAGE, (message) => {
        // Broadcast new message to all clients
        socket.broadcast.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
        console.log('Message broadcasted:', message.id);
      });

      socket.on(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, (statusUpdate) => {
        // Broadcast status update to all clients
        socket.broadcast.emit(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, statusUpdate);
        console.log('Status update broadcasted:', statusUpdate);
      });

      socket.on(SOCKET_EVENTS.USER_TYPING, (typingData) => {
        // Broadcast typing indicator to other clients
        socket.broadcast.emit(SOCKET_EVENTS.USER_TYPING, typingData);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return new Response('Socket.IO server initialized', { status: 200 });
}