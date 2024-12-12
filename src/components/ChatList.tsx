import { useNavigate } from 'react-router-dom';
import { Chat } from '../types/chat';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string | null;
  onChatSelect?: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onChatSelect }: ChatListProps) {

  const navigate = useNavigate()

  const handleChatClick = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    } else {
      navigate(`/chat/${chatId}`);
    }
  };

  return (
    <div className="h-full">
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
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}