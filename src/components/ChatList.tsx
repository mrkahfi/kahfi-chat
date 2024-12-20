import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { NewChatDialog } from './NewChatDialog';
import { ChatItem } from './chat/ChatItem';

import { useChatStore } from '../stores/chatStore';
import NoChats from './NoChats';

interface ChatListProps {
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
}

export function ChatList({ onChatSelect }: ChatListProps) {
  const navigate = useNavigate();
  const { chats, addChat, setCurrentChat } = useChatStore();
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
    addChat(name, image);
  };

  //   <div className="text-center py-12 m-5">
  //   <h2 className="text-md mb-4">You have no chats yet.</h2>
  //   <button
  //     className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  //     onClick={() => setIsNewChatModalOpen(true)}
  //   >
  //     Start a new chat
  //   </button>
  // </div>

  return (
    <div className="h-full relative">
      <div className="p-4 bg-gray-50 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
      </div>
      <div className="overflow-y-auto">
        {chats.length === 0 ? (
          <NoChats onClick={() => setIsNewChatModalOpen(true)} />
        ) : (
          chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chatId={chat.id}
              isSelected={false}
              onClick={() => handleChatClick(chat.id)}
            />
          ))
        )}
      </div>

      {chats.length > 0 ? (
        <button
          className="absolute bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          onClick={() => setIsNewChatModalOpen(true)}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      ) : (
        ''
      )}

      <NewChatDialog
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onSave={handleNewChat}
      />
    </div>
  );
}
