import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { ChatFormDialog } from './ChatFormDialog';
import ChatItemLoading, { ChatItem } from './chat/ChatItem';

import { useChatStore } from '../stores/chatStore';
import NoChats from './NoChats';
import { LogOut, MoreVertical } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

interface ChatListProps {
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
}

export function ChatList({ onChatSelect }: ChatListProps) {
  const navigate = useNavigate();
  const { chats, addChat, setCurrentChat, isLoadingChats } = useChatStore();
  const [isChatFormModalOpen, setIsNewChatModalOpen] = useState(false);

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

  const onLogoutClicked = async () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="h-full relative">
      <div className="p-4 bg-gray-50 border-b justify-between flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>

        <DropdownMenu onLogoutClicked={onLogoutClicked} />
      </div>
      <div className="overflow-y-auto">
        {isLoadingChats ? (
          <ChatItemLoading />
        ) : chats.length === 0 ? (
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

      <ChatFormDialog
        isOpen={isChatFormModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onSave={handleNewChat}
      />
    </div>
  );
}

function DropdownMenu({ onLogoutClicked }: { onLogoutClicked: () => void }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="p-1 hover:bg-gray-200 rounded-full">
        <MoreVertical className="w-6 h-6" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
        <MenuItem>
          {({ focus }) => (
            <button
              className={`${focus ? 'bg-gray-100' : ''} flex items-center px-4 py-2 tet-sm text-gray-700 w-full`}
              onClick={onLogoutClicked}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
