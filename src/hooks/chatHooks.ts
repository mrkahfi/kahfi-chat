import { useState, useEffect } from 'react';
import { Chat } from '../types/chat';
import { getChatById, getChats } from '../data/chatDatabase';

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const fetchedChats = await getChats();
        setChats(fetchedChats);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, []);

  return { chats, setChats };
};

export const useChatById = (chatId: string) => {
  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
    const fetchChatById = async () => {
      try {
        const fetchedChat = await getChatById(chatId);
        if (fetchedChat) {
          setChat(fetchedChat);
        }
      } catch (error) {
        console.error('Failed to fetch chat:', error);
      }
      return null;
    };
    fetchChatById();
  }, []);

  return { chat, setChat };
};
