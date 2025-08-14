'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, MessageCircle, Users } from 'lucide-react';

export function UserProfile() {
  return (
    <div className="bg-whatsapp-light-gray p-3 sm:p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center min-w-0 flex-1">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
            <AvatarImage src="/avatars/user.png" />
            <AvatarFallback className="bg-whatsapp-primary text-white text-xs sm:text-sm font-medium">
              WA
            </AvatarFallback>
          </Avatar>
          <span className="ml-2 sm:ml-3 font-medium text-gray-800 text-sm sm:text-base truncate">
            WhatsApp Web
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {/* Hide some buttons on mobile */}
          <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-full transition-colors hidden sm:flex">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          
          <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          
          <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}