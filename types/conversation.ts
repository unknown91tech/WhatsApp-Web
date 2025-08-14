// types/conversation.ts - Conversation type definitions
import { Message } from './message';

export interface Conversation {
  _id?: string;
  id: string;
  wa_id: string;
  contact: {
    profile: {
      name: string;
    };
    wa_id: string;
  };
  lastMessage?: Message;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationSummary {
  _id?: string;
  id?: string;
  wa_id: string;
  contact: {
    profile: {
      name: string;
    };
    wa_id: string;
  };
  lastMessage?: {
    text?: {
      body: string;
    };
    timestamp: string;
    isOutgoing: boolean;
    status?: 'sent' | 'delivered' | 'read';
  };
  lastMessageTime: Date;
  unreadCount: number;
}