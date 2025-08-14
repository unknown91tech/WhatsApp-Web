'use client';

import { ConversationSummary } from '@/types/conversation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatMessageTime } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

interface ConversationItemProps {
  conversation: ConversationSummary;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== 'string') {
      return 'U';
    }
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getLastMessagePreview = () => {
    if (!conversation.lastMessage?.text?.body) return 'No messages yet';
    
    const maxLength = 40; // Shorter for mobile
    const message = conversation.lastMessage.text.body;
    return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  const renderMessageStatus = () => {
    if (!conversation.lastMessage?.isOutgoing) return null;

    const status = conversation.lastMessage.status || 'sent';
    
    if (status === 'read') {
      return <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />;
    } else if (status === 'delivered') {
      return <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />;
    } else {
      return <Check className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />;
    }
  };

  // Safe access to contact name with fallbacks
  const contactName = conversation.contact?.profile?.name || conversation.wa_id || 'Unknown User';

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center p-3 sm:p-4 cursor-pointer 
        hover:bg-gray-50 active:bg-gray-100
        border-b border-gray-100 
        transition-colors duration-150
        ${isSelected ? 'bg-gray-100' : 'bg-white'}
        min-h-[72px] sm:min-h-[80px]
      `}
    >
      {/* Avatar */}
      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 mr-3 flex-shrink-0">
        <AvatarImage src={`/avatars/${conversation.wa_id}.png`} />
        <AvatarFallback className="bg-whatsapp-primary text-white font-medium text-xs sm:text-sm">
          {getInitials(contactName)}
        </AvatarFallback>
      </Avatar>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base pr-2">
            {contactName}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {conversation.lastMessageTime ? formatMessageTime(conversation.lastMessageTime) : ''}
          </span>
        </div>
        
        {/* Message Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1 pr-2">
            <div className="mr-1 flex-shrink-0">
              {renderMessageStatus()}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {getLastMessagePreview()}
            </p>
          </div>
          
          {/* Unread Badge */}
          {conversation.unreadCount > 0 && (
            <div className="bg-whatsapp-primary text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 flex-shrink-0">
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}