
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(parseInt(timestamp) * 1000) : timestamp;
  
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE');
  } else if (isThisYear(date)) {
    return format(date, 'MMM dd');
  } else {
    return format(date, 'MMM dd, yyyy');
  }
}

export function formatChatTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(parseInt(timestamp) * 1000) : timestamp;
  return format(date, 'HH:mm');
}

export function formatLastSeen(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(parseInt(timestamp) * 1000) : timestamp;
  
  if (isToday(date)) {
    return `today at ${format(date, 'HH:mm')}`;
  } else if (isYesterday(date)) {
    return `yesterday at ${format(date, 'HH:mm')}`;
  } else {
    return format(date, 'MMM dd, yyyy \'at\' HH:mm');
  }
}

export function generateMessageId(): string {
  return `wamid.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
}

export function generateConversationId(wa_id: string): string {
  return `conv_${wa_id}_${Date.now()}`;
}

export function parsePhoneNumber(phoneNumber: string | undefined): string {
  // Handle undefined or null phoneNumber
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return 'Unknown Number';
  }
  
  // Remove any non-digit characters and format for display
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.length >= 10) {
    return `+${digits}`;
  }
  return phoneNumber;
}