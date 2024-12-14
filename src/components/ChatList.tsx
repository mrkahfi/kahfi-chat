import { useNavigate } from 'react-router-dom';
import { Chat } from '../types/chat';
import { format } from 'date-fns';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { NewChatDialog } from './NewChatDialog';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: (name: string, image: File) => void;
}

export function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
  onNewChat,
}: ChatListProps) {
  const navigate = useNavigate();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const handleChatClick = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    } else {
      navigate(`/chat/${chatId}`);
    }
  };

  const handleNewChat = (name: string, image: File) => {
    if (onNewChat) {
      onNewChat(name, image);
    }
  };

  return (
    <div className="h-full relative">
      <div className="p-4 bg-gray-50 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 border-b transition-colors ${
              selectedChatId === chat.id ? 'bg-gray-100' : ''
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {format(new Date(), 'HH:mm')}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
      <button
        className="absolute bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsNewChatModalOpen(true)}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <NewChatDialog
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onSave={handleNewChat}
      />
    </div>
  );
}
