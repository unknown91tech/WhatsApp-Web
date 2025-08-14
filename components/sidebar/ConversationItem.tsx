// components/sidebar/ConversationItem.tsx - Individual conversation item (FIXED)
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
      return 'U'; // Default fallback
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
    
    const maxLength = 50;
    const message = conversation.lastMessage.text.body;
    return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  const renderMessageStatus = () => {
    if (!conversation.lastMessage?.isOutgoing) return null;

    const status = conversation.lastMessage.status || 'sent';
    
    if (status === 'read') {
      return <CheckCheck className="h-4 w-4 text-blue-500" />;
    } else if (status === 'delivered') {
      return <CheckCheck className="h-4 w-4 text-gray-400" />;
    } else {
      return <Check className="h-4 w-4 text-gray-400" />;
    }
  };

  // Safe access to contact name with fallbacks
  const contactName = conversation.contact?.profile?.name || conversation.wa_id || 'Unknown User';

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src={`/avatars/${conversation.wa_id}.png`} />
        <AvatarFallback className="bg-whatsapp-primary text-white font-medium">
          {getInitials(contactName)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate">
            {contactName}
          </h3>
          <span className="text-xs text-gray-500 ml-2">
            {conversation.lastMessageTime ? formatMessageTime(conversation.lastMessageTime) : ''}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            {renderMessageStatus()}
            <p className="text-sm text-gray-600 truncate ml-1">
              {getLastMessagePreview()}
            </p>
          </div>
          
          {conversation.unreadCount > 0 && (
            <div className="bg-whatsapp-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}