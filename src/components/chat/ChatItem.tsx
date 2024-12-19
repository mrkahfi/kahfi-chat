import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getImage } from '../../data/chatDatabase';
import { useChatById } from '../../hooks/chatHooks';

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
  const { chat } = useChatById(chatId);
  const [avatar, setAvatar] = useState<string | undefined>(chat?.avatar);

  useEffect(() => {
    const loadAvatar = async () => {
      if (chat?.avatar) {
        const blob = await getImage(chat.avatar);
        if (blob) {
          setAvatar(URL.createObjectURL(blob));
        }
      }
    };

    loadAvatar();
  }, [chat?.avatar]);

  if (!chat) {
    return <div className="flex justify-center items-center h-12" />;
  }

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 border-b transition-colors ${
        isSelected ? 'bg-gray-100' : ''
      }`}
    >
      <img
        src={avatar}
        alt={chat?.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {chat?.name}
          </h3>
          <span className="text-xs text-gray-500">
            {format(new Date(), 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-left text-gray-500 truncate">
          {chat?.lastMessage}
        </p>
      </div>
    </button>
  );
};
