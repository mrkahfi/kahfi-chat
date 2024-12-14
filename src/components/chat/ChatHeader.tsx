import { ArrowLeft } from 'lucide-react';
import { Chat } from '../../types/chat';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatHeader({ chat, onBack }: ChatHeaderProps) {
  const isMobile = useIsMobile();
  return (
    <div className="p-4 bg-gray-50 border-b flex items-center space-x-4">
      {isMobile && (
        <button onClick={onBack} className="p-1 hover:bg-gray-200 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="text-lg font-semibold">{chat.name}</h2>
    </div>
  );
}
