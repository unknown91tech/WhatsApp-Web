
'use client';

import { Message } from '@/types/message';
import { MessageStatus } from './MessageStatus';
import { formatChatTime } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.isOutgoing || message.from === '918329446654';
  
  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOutgoing
            ? 'bg-whatsapp-light text-gray-800 rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
        }`}
      >
        <div className="break-words">
          {message.text?.body || 'Unsupported message type'}
        </div>
        
        <div className={`flex items-center mt-1 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500 mr-1">
            {formatChatTime(message.timestamp)}
          </span>
          {isOutgoing && (
            <MessageStatus 
              status={message.status || 'sent'} 
              className="ml-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}