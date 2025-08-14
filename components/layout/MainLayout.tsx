'use client';

import { useState, useEffect } from 'react';
import { ConversationSummary } from '@/types/conversation';
import { useConversations } from '@/hooks/useConversations';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';

export function MainLayout() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationSummary | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { conversations, loading } = useConversations();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const target = event.target as Element;
        const sidebar = document.getElementById('mobile-sidebar');
        const hamburger = document.getElementById('hamburger-menu');
        
        if (sidebar && !sidebar.contains(target) && hamburger && !hamburger.contains(target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const handleConversationSelect = (conversation: ConversationSummary) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`
          ${isMobile ? 'fixed' : 'relative'}
          ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-full max-w-sm' : 'w-96'}
          h-full bg-white border-r border-gray-200 z-50
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <Sidebar
          conversations={conversations}
          selectedConversationId={selectedConversation?.wa_id}
          onConversationSelect={handleConversationSelect}
          loading={loading}
          className="h-full"
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatContainer
          conversation={selectedConversation}
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
}