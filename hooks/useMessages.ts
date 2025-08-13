
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/types/message';
import { useSocket } from './useSocket';

interface UseMessagesProps {
  conversationId?: string;
  wa_id?: string;
}

export function useMessages({ conversationId, wa_id }: UseMessagesProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { onNewMessage, onMessageStatusUpdate, emitNewMessage } = useSocket();

  const fetchMessages = useCallback(async () => {
    if (!wa_id) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/messages?wa_id=${wa_id}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      setMessages(data.messages || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, [wa_id]);

  const addMessage = useCallback((newMessage: Message) => {
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const updateMessageStatus = useCallback((messageId: string, status: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, status: status as any } : msg
      )
    );
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!wa_id || !text.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      from: '918329446654', // Our WhatsApp number
      to: wa_id,
      text: { body: text.trim() },
      type: 'text',
      timestamp: Math.floor(Date.now() / 1000).toString(),
      status: 'sent',
      isOutgoing: true,
    };

    try {
      // Add message to local state immediately
      addMessage(newMessage);

      // Send to server
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          wa_id,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      // Emit through socket for real-time updates
      emitNewMessage(newMessage);

    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove message from local state if sending failed
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }
  }, [wa_id, addMessage, emitNewMessage]);

  useEffect(() => {
    if (wa_id) {
      fetchMessages();
    }
  }, [wa_id, fetchMessages]);

  useEffect(() => {
    onNewMessage((message: Message) => {
      // Only add message if it belongs to current conversation
      if (message.from === wa_id || message.to === wa_id) {
        addMessage(message);
      }
    });

    onMessageStatusUpdate((statusUpdate: any) => {
      updateMessageStatus(statusUpdate.messageId, statusUpdate.status);
    });
  }, [wa_id, onNewMessage, onMessageStatusUpdate, addMessage, updateMessageStatus]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refetch: fetchMessages,
    addMessage,
    updateMessageStatus,
  };
}