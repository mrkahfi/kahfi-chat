import { useNavigate } from 'react-router-dom';
import { Chat } from '../types/chat';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { NewChatDialog } from './NewChatDialog';
import { ChatItem } from './chat/ChatItem';
import { useChatStore } from '../stores/chatStore';
import { addChat, saveImage } from '../data/chatDatabase';

interface ChatListProps {
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
  onNewChat?: (newChat: Chat) => void;
}

export function ChatList({ onChatSelect, onNewChat }: ChatListProps) {
  const navigate = useNavigate();
  const { chats, setCurrentChat, setChats } = useChatStore();

  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const handleChatClick = (chatId: string) => {
    setCurrentChat(chatId);
    if (onChatSelect) {
      onChatSelect(chatId);
    } else {
      navigate(`/chat/${chatId}`);
    }
  };

  const handleNewChat = async (name: string, image: File) => {
    const id = Date.now().toString();
    const imageBlob = new Blob([image], { type: image.type });
    await saveImage(id, imageBlob);

    const newChat: Chat = {
      id: id,
      name,
      avatar: id,
      lastMessage: '',
      timestamp: new Date(),
    };

    await addChat(newChat);
    setChats([...chats, newChat]);

    if (onNewChat) {
      onNewChat(newChat);
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
            key={chat.id}
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
