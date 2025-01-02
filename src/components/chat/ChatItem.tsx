import React from 'react';
import { format } from 'date-fns';

import { useChatItem } from '../../hooks/useChatItem';

interface ChatItemProps {
  chatId: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  isSelected,
  onClick,
}) => {
  const { chat, avatar } = useChatItem(chatId);

  if (!chat) return null;

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 border-b transition-colors ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <img
        src={avatar}
        alt={chat.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0 ">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {chat.name}
          </h3>
          <span className="text-xs text-gray-500">
            {format(new Date(chat.timestamp), 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate text-left">
          {chat?.lastMessage}
        </p>
      </div>
    </button>
  );
};


const ChatItemLoading = () => {
  return (
    <div className="w-full p-4 flex items-center space-x-4 border-b animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1 min-w-0 ">
        <div className="flex justify-between items-baseline mb-1">
          <div className="h-4 bg-gray-300 w-24 rounded"></div>
          <div className="h-3 bg-gray-300 w-12 rounded"></div>
        </div>
        <div className="h-3 bg-gray-300 w-48 rounded"></div>
      </div>
    </div>
  );
};

export default ChatItemLoading;