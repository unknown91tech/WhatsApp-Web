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
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-1 sm:mb-2 px-2 sm:px-0`}>
      <div
        className={`
          max-w-[85%] sm:max-w-xs lg:max-w-md 
          px-3 sm:px-4 py-2 sm:py-2.5 
          rounded-lg 
          ${isOutgoing
            ? 'bg-whatsapp-light text-gray-800 rounded-br-none shadow-sm' 
            : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
          }
          transition-all duration-200
        `}
      >
        {/* Message Text */}
        <div className="break-words text-sm sm:text-base leading-relaxed">
          {message.text?.body || 'Unsupported message type'}
        </div>
        
        {/* Message Footer */}
        <div className={`
          flex items-center mt-1 
          ${isOutgoing ? 'justify-end' : 'justify-start'}
          gap-1
        `}>
          <span className="text-xs text-gray-500">
            {formatChatTime(message.timestamp)}
          </span>
          {isOutgoing && (
            <MessageStatus 
              status={message.status || 'sent'} 
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}