
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './constants';
import { Message } from '@/types/message';

interface MessageStatusUpdate {
  messageId: string;
  status: string;
}

interface ConversationUpdate {
  conversationId: string;
  lastMessage: Message;
}

interface TypingData {
  conversationId: string;
  isTyping: boolean;
}

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

  emit(event: string, data: unknown): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: unknown) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: unknown) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Convenience methods for WhatsApp events
  onNewMessage(callback: (message: Message) => void): void {
    this.on(SOCKET_EVENTS.NEW_MESSAGE, callback as (data: unknown) => void);
  }

  onMessageStatusUpdate(callback: (status: MessageStatusUpdate) => void): void {
    this.on(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, callback as (data: unknown) => void);
  }

  onConversationUpdate(callback: (conversation: ConversationUpdate) => void): void {
    this.on(SOCKET_EVENTS.CONVERSATION_UPDATE, callback as (data: unknown) => void);
  }

  emitNewMessage(message: Message): void {
    this.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
  }

  emitTyping(conversationId: string, isTyping: boolean): void {
    const typingData: TypingData = { conversationId, isTyping };
    this.emit(SOCKET_EVENTS.USER_TYPING, typingData);
  }
}

export const socketService = new SocketService();
export default socketService;