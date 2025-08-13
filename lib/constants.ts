
export const COLLECTIONS = {
  PROCESSED_MESSAGES: 'processed_messages',
  CONVERSATIONS: 'conversations',
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  DOCUMENT: 'document',
  AUDIO: 'audio',
  VIDEO: 'video',
} as const;

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const;

export const WHATSAPP_PHONE_NUMBER = '918329446654';

export const SOCKET_EVENTS = {
  NEW_MESSAGE: 'new_message',
  MESSAGE_STATUS_UPDATE: 'message_status_update',
  CONVERSATION_UPDATE: 'conversation_update',
  USER_TYPING: 'user_typing',
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;