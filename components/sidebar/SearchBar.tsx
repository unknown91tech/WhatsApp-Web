
'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search or start new chat" }: SearchBarProps) {
  return (
    <div className="relative p-3 border-b border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 py-2 bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-1 focus:ring-whatsapp-primary"
        />
      </div>
    </div>
  );
}