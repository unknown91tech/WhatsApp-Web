'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, MoreVertical, Phone, Video, ArrowLeft, Menu } from 'lucide-react';
import { ConversationSummary } from '@/types/conversation';
import { parsePhoneNumber } from '@/lib/utils';

interface ChatHeaderProps {
  conversation?: ConversationSummary;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
  showBackButton?: boolean;
}

export function ChatHeader({ 
  conversation, 
  onToggleSidebar,
  isMobile = false,
  showBackButton = false
}: ChatHeaderProps) {
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
  const contactName = conversation?.contact?.profile?.name || conversation?.wa_id || 'Unknown User';

  if (!conversation) {
    return (
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between min-h-[64px]">
        {isMobile && (
          <Button
            id="hamburger-menu"
            onClick={onToggleSidebar}
            variant="ghost"
            size="icon"
            className="mr-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="text-gray-500 text-sm sm:text-base">
          Select a conversation to start chatting
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between min-h-[64px]">
      <div className="flex items-center flex-1 min-w-0">
        {/* Back/Menu Button for Mobile */}
        {isMobile && (
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="icon"
            className="mr-2 sm:mr-3 text-gray-600 hover:bg-gray-100 flex-shrink-0"
          >
            {showBackButton ? (
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
        )}
        
        {/* Avatar */}
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3 flex-shrink-0">
          <AvatarImage src={`/avatars/${conversation.wa_id}.png`} />
          <AvatarFallback className="bg-whatsapp-primary text-white font-medium text-xs sm:text-sm">
            {getInitials(contactName)}
          </AvatarFallback>
        </Avatar>
        
        {/* Contact Info */}
        <div className="min-w-0 flex-1">
          <h2 className="font-medium text-gray-900 text-sm sm:text-base truncate">
            {contactName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {parsePhoneNumber(conversation.wa_id)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {/* Hide some buttons on small mobile screens */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:text-gray-700 hidden xs:flex w-8 h-8 sm:w-10 sm:h-10"
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        
        {!isMobile && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10"
            >
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10"
        >
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}