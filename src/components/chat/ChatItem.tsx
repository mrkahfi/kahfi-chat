import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Chat } from '../../types/chat';
import { getImage } from '../../data/chatDatabase';

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isSelected,
  onClick,
}) => {
  const [avatar, setAvatar] = useState<string | undefined>(chat.avatar);

  useEffect(() => {
    const loadAvatar = async () => {
      if (chat.avatar) {
        const blob = await getImage(chat.avatar);
        if (blob) {
          setAvatar(URL.createObjectURL(blob));
        }
      }
    };

    loadAvatar();
  }, [chat.avatar]);

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
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {chat.name}
          </h3>
          <span className="text-xs text-gray-500">
            {format(new Date(), 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
      </div>
    </button>
  );
};
