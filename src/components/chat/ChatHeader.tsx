import { ArrowLeft, MoreVertical, Trash2, Eraser } from 'lucide-react';
import { Chat } from '../../types/chat';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

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

      <DropdownMenu onClear={onClear} onDelete={onDelete} />
    </div>
  );
}

function DropdownMenu({
  onClear,
  onDelete,
}: {
  onClear: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="p-1 hover:bg-gray-200 rounded-full">
        <MoreVertical className="w-6 h-6" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
        <MenuItem>
          {({ focus }) => (
            <button
              className={`${
                focus ? 'bg-gray-100' : ''
              } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
              onClick={onClear}
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100' : ''
              } flex items-center px-4 py-2 text-sm text-gray-700 w-full`}
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
