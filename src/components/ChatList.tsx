import { useNavigate } from 'react-router-dom';
import { Chat } from '../types/chat';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { NewChatDialog } from './NewChatDialog';
import { ChatItem } from './chat/ChatItem';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: (name: string, image: File) => void;
}

export function ChatList({ chats, onChatSelect, onNewChat }: ChatListProps) {
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
          <ChatItem
            chatId={chat.id}
            isSelected={false}
            onClick={() => handleChatClick(chat.id)}
          />
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
