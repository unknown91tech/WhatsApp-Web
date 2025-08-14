
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConversationSummary } from '@/types/conversation';
import { useSocket } from './useSocket';

export function useConversations() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { onConversationUpdate } = useSocket();

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/conversations');
      if (!response.ok) throw new Error('Failed to fetch conversations');
      
      const data = await response.json();
      setConversations(data.conversations || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConversation = useCallback((updatedConversation: ConversationSummary) => {
    setConversations(prev => {
      const index = prev.findIndex(conv => conv.wa_id === updatedConversation.wa_id);
      if (index >= 0) {
        const newConversations = [...prev];
        newConversations[index] = updatedConversation;
        // Sort by last message time
        return newConversations.sort((a, b) => 
          new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        );
      } else {
        // Add new conversation at the top
        return [updatedConversation, ...prev];
      }
    });
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    onConversationUpdate((conversation: any) => {
      updateConversation(conversation);
    });
  }, [onConversationUpdate, updateConversation]);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
    updateConversation,
  };
}