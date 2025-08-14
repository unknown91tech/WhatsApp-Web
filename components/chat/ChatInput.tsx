'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Send, Paperclip, Smile, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isMobile?: boolean;
}

export function ChatInput({ onSendMessage, disabled, isMobile = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setIsTyping(value.length > 0);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const maxHeight = isMobile ? 100 : 120;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  };

  // Focus input when not on mobile to avoid keyboard popup issues
  useEffect(() => {
    if (!isMobile && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isMobile]);

  return (
    <div className={`bg-white border-t border-gray-200 p-2 sm:p-4 ${isMobile ? 'pb-safe' : ''}`}>
      <div className="flex items-end space-x-1 sm:space-x-2 max-w-full">
        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`flex-shrink-0 text-gray-500 hover:text-gray-700 ${
            isMobile ? 'w-8 h-8' : 'w-10 h-10'
          }`}
          disabled={disabled}
        >
          {isMobile ? (
            <Plus className="h-5 w-5" />
          ) : (
            <Paperclip className="h-5 w-5" />
          )}
        </Button>

        {/* Input Container */}
        <div className="flex-1 relative min-w-0">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              disabled={disabled}
              className={`
                w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 
                rounded-lg border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-whatsapp-primary focus:border-transparent 
                resize-none scrollbar-hide
                text-sm sm:text-base
                ${isMobile ? 'min-h-[36px] max-h-[100px]' : 'min-h-[48px] max-h-[120px]'}
              `}
              rows={1}
              style={{ 
                lineHeight: isMobile ? '1.4' : '1.5',
                fontSize: isMobile ? '16px' : '14px' // Prevent zoom on iOS
              }}
            />
            
            {/* Emoji Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-1 sm:right-2 bottom-1 sm:bottom-2 text-gray-500 hover:text-gray-700 ${
                isMobile ? 'w-6 h-6' : 'w-8 h-8'
              }`}
              disabled={disabled}
            >
              <Smile className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
            </Button>
          </div>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`
            flex-shrink-0 bg-whatsapp-primary hover:bg-whatsapp-secondary 
            text-white rounded-full transition-all duration-200
            ${!message.trim() ? 'opacity-50' : 'opacity-100'}
            ${isMobile ? 'w-8 h-8 p-0' : 'w-12 h-12 p-3'}
          `}
          size="icon"
        >
          <Send className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
        </Button>
      </div>
      
      {/* Typing Indicator (for future enhancement) */}
      {isTyping && (
        <div className="text-xs text-gray-400 mt-1 hidden">
          typing...
        </div>
      )}
    </div>
  );
}