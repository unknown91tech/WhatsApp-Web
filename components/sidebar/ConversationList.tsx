
'use client';

import { useState, useMemo } from 'react';
import { ConversationSummary } from '@/types/conversation';
import { ConversationItem } from './ConversationItem';
import { SearchBar } from './SearchBar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationListProps {
  conversations: ConversationSummary[];
  selectedConversationId?: string;
  onConversationSelect: (conversation: ConversationSummary) => void;
  loading?: boolean;
}

export function ConversationList({ 
  conversations, 
  selectedConversationId, 
  onConversationSelect,
  loading 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    return conversations.filter(conversation =>
      conversation.contact.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.wa_id.includes(searchQuery) ||
      conversation.lastMessage?.text?.body?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
      />
      
      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.wa_id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.wa_id}
                onClick={() => onConversationSelect(conversation)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}