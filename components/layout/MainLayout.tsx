
'use client';

import { useState } from 'react';
import { ConversationSummary } from '@/types/conversation';
import { useConversations } from '@/hooks/useConversations';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';

export function MainLayout() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationSummary | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { conversations, loading } = useConversations();

  const handleConversationSelect = (conversation: ConversationSummary) => {
    setSelectedConversation(conversation);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'block' : 'hidden'} 
        lg:block 
        w-full lg:w-96 
        ${sidebarOpen ? 'absolute lg:relative z-50' : 'relative'}
        h-full
      `}>
        <Sidebar
          conversations={conversations}
          selectedConversationId={selectedConversation?.wa_id}
          onConversationSelect={handleConversationSelect}
          loading={loading}
          className="h-full"
        />
      </div>

      {/* Chat Area */}
      <div className={`
        flex-1 
        ${sidebarOpen ? 'hidden lg:flex' : 'flex'}
        flex-col
      `}>
        <ChatContainer
          conversation={selectedConversation}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}