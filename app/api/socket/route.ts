
import { NextResponse } from 'next/server';
import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '@/lib/constants';

declare global {
  // eslint-disable-next-line no-var
  var io: Server | undefined;
}

export async function GET() {
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

      socket.on(SOCKET_EVENTS.NEW_MESSAGE, (message: unknown) => {
        // Broadcast new message to all clients
        socket.broadcast.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
        console.log('Message broadcasted:', message);
      });

      socket.on(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, (statusUpdate: unknown) => {
        // Broadcast status update to all clients
        socket.broadcast.emit(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, statusUpdate);
        console.log('Status update broadcasted:', statusUpdate);
      });

      socket.on(SOCKET_EVENTS.USER_TYPING, (typingData: unknown) => {
        // Broadcast typing indicator to other clients
        socket.broadcast.emit(SOCKET_EVENTS.USER_TYPING, typingData);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return NextResponse.json({ message: 'Socket.IO server initialized' });
}