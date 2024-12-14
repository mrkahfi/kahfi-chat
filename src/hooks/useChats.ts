import { useState, useEffect } from 'react';
import { Chat } from '../types/chat';
import { getChats } from '../data/chatDatabase';

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
