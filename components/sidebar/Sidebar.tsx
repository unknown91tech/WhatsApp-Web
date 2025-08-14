'use client';

import { ConversationSummary } from '@/types/conversation';
import { UserProfile } from './UserProfile';
import { ConversationList } from './ConversationList';

interface SidebarProps {
  conversations: ConversationSummary[];
  selectedConversationId?: string;
  onConversationSelect: (conversation: ConversationSummary) => void;
  loading?: boolean;
  className?: string;
}

export function Sidebar({ 
  conversations, 
  selectedConversationId, 
  onConversationSelect, 
  loading,
  className = ""
}: SidebarProps) {
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full ${className}`}>
      {/* User Profile Header */}
      <div className="flex-shrink-0">
        <UserProfile />
      </div>
      
      {/* Conversations List */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onConversationSelect={onConversationSelect}
          loading={loading}
        />
      </div>
    </div>
  );
}