// types/message.ts - Message type definitions
export interface Message {
  _id?: string;
  id: string;
  from: string;
  to: string;
  text?: {
    body: string;
  };
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  conversation_id?: string;
  meta_msg_id?: string;
  gs_id?: string;
  isOutgoing?: boolean;
  contact?: {
    profile: {
      name: string;
    };
    wa_id: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MessageStatus {
  id: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: string;
  recipient_id: string;
  conversation?: {
    id: string;
    origin: {
      type: string;
    };
  };
  pricing?: {
    billable: boolean;
    category: string;
    pricing_model: string;
    type: string;
  };
}

export interface ProcessedMessage extends Message {
  createdAt: Date;
  updatedAt: Date;
}