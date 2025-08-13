
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, MessageCircle, Users, Settings } from 'lucide-react';

export function UserProfile() {
  return (
    <div className="bg-whatsapp-light-gray p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/user.png" />
            <AvatarFallback className="bg-whatsapp-primary text-white">
              WA
            </AvatarFallback>
          </Avatar>
          <span className="ml-3 font-medium text-gray-800">WhatsApp Web</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <Users className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}