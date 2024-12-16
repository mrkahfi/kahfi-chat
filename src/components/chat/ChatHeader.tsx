import { ArrowLeft, MoreVertical, Trash2, Eraser } from 'lucide-react';
import { Chat } from '../../types/chat';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useState } from 'react';

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function ChatHeader({
  chat,
  onBack,
  onClear,
  onDelete,
}: ChatHeaderProps) {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
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
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreVertical className="w-6 h-6" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={() => {
                  onClear();
                  setIsMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <Eraser className="w-4 h-4 mr-2" />
                Clear
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setIsMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
