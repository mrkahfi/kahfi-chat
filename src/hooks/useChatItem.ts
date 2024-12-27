import { useChatStore } from '../stores/chatStore';
import { useCallback, useEffect, useState } from 'react';
import { Chat } from '../types/chat';
import { getImage } from '../data/chatDatabase';

export const useChatItem = (chatId: string) => {
  const chat = useChatStore(
    useCallback((state) => state.chats.find((c) => c.id === chatId), [chatId])
  );
  const updateChat = useChatStore((state) => state.updateChat);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

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
  }, [chat]);

  return {
    chat,
    avatar,
    updateChat: useCallback(
      (updates: Partial<Chat>) => {
        if (chat) {
          updateChat({ ...chat, ...updates });
        }
      },
      [chat, updateChat]
    ),
  };
};
