
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './constants';

class SocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor() {
    this.url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
  }

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(this.url, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Convenience methods for WhatsApp events
  onNewMessage(callback: (message: any) => void): void {
    this.on(SOCKET_EVENTS.NEW_MESSAGE, callback);
  }

  onMessageStatusUpdate(callback: (status: any) => void): void {
    this.on(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, callback);
  }

  onConversationUpdate(callback: (conversation: any) => void): void {
    this.on(SOCKET_EVENTS.CONVERSATION_UPDATE, callback);
  }

  emitNewMessage(message: any): void {
    this.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
  }

  emitTyping(conversationId: string, isTyping: boolean): void {
    this.emit(SOCKET_EVENTS.USER_TYPING, { conversationId, isTyping });
  }
}

export const socketService = new SocketService();
export default socketService;