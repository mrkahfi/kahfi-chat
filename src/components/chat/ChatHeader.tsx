import { ArrowLeft, MoreVertical, Trash2, Eraser, Pencil } from 'lucide-react';
import { Chat } from '../../types/chat';
import { useIsMobile } from '../../hooks/useIsMobile';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { getImage } from '../../data/chatDatabase';

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
  onClickEdit: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function ChatHeader({
  chat,
  onClickEdit,
  onBack,
  onClear,
  onDelete,
}: ChatHeaderProps) {
  const isMobile = useIsMobile();

  const [avatar, setAvatar] = useState<string | undefined>(chat.avatar);

  useEffect(() => {
    console.log('useEffect');
    const loadAvatar = async () => {
      if (chat.avatar) {
        const blob = await getImage(chat.avatar);
        if (blob) {
          setAvatar(URL.createObjectURL(blob));
        }
      }
    };

    loadAvatar();
  }, [chat]);

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
          src={avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">{chat.name}</h2>
      </div>

      <DropdownMenu
        onClickEdit={onClickEdit}
        onClear={onClear}
        onDelete={onDelete}
      />
    </div>
  );
}

function DropdownMenu({
  onClickEdit,
  onClear,
  onDelete,
}: {
  onClickEdit: () => void;
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
              className={`${focus ? 'bg-gray-100' : ''} flex items-center px-4 py-2 tet-sm text-gray-700 w-full`}
              onClick={onClickEdit}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </button>
          )}
        </MenuItem>
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
          {({ focus }) => (
            <button
              className={`${
                focus ? 'bg-gray-100' : ''
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
