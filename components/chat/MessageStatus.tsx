
'use client';

import { Check, CheckCheck, Clock } from 'lucide-react';

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read' | 'pending';
  className?: string;
}

export function MessageStatus({ status, className = "" }: MessageStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'sent':
        return <Check className="h-4 w-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center ${className}`}>
      {getStatusIcon()}
    </span>
  );
}