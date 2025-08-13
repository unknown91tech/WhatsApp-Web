
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, MoreVertical, Phone, Video } from 'lucide-react';
import { ConversationSummary } from '@/types/conversation';
import { parsePhoneNumber } from '@/lib/utils';

interface ChatHeaderProps {
  conversation?: ConversationSummary;
  onToggleSidebar?: () => void;
}

export function ChatHeader({ conversation, onToggleSidebar }: ChatHeaderProps) {
  if (!conversation) {
    return (
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="text-gray-500">Select a conversation to start chatting</div>
      </div>
    );
  }

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

  // Safe access to contact name with fallbacks
  const contactName = conversation.contact?.profile?.name || conversation.wa_id || 'Unknown User';

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden mr-3 p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={`/avatars/${conversation.wa_id}.png`} />
          <AvatarFallback className="bg-whatsapp-primary text-white font-medium">
            {getInitials(contactName)}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-medium text-gray-900">
            {contactName}
          </h2>
          <p className="text-sm text-gray-500">
            {parsePhoneNumber(conversation.wa_id)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}