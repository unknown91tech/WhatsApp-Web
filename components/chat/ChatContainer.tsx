'use client';

import { ConversationSummary } from '@/types/conversation';
import { useMessages } from '@/hooks/useMessages';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatContainerProps {
  conversation?: ConversationSummary;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

export function ChatContainer({ 
  conversation, 
  onToggleSidebar,
  isMobile = false,
  sidebarOpen = false
}: ChatContainerProps) {
  const { messages, loading, sendMessage } = useMessages({ 
    wa_id: conversation?.wa_id 
  });

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        <ChatHeader 
          onToggleSidebar={onToggleSidebar}
          isMobile={isMobile}
          showBackButton={false}
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500 max-w-md mx-auto">
            <div className="mb-6">
              <svg 
                className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-gray-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              Welcome to WhatsApp Web
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {isMobile 
                ? "Tap the menu to select a conversation or start a new chat."
                : "Select a conversation from the sidebar to start messaging, or start a new conversation."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <ChatHeader 
        conversation={conversation} 
        onToggleSidebar={onToggleSidebar}
        isMobile={isMobile}
        showBackButton={isMobile}
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        <ChatMessages 
          messages={messages} 
          loading={loading}
        />
        
        <ChatInput 
          onSendMessage={sendMessage}
          disabled={loading}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}