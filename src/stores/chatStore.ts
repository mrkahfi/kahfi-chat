import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import { getChatById, addMessage } from '../data/chatDatabase';

interface ChatStore {
  chats: Chat[];
  messages: Message[];
  currentChat: Chat | null;
  setChats: (chats: Chat[]) => void;
  updateChat: (updatedChat: Chat) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentChat: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, message: Message) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  messages: [],
  currentChat: null,
  setChats: (chats) => set({ chats }),
  updateChat: (updatedChat) => {
    return set((state) => ({
      currentChat:
        state.currentChat?.id === updatedChat.id
          ? updatedChat
          : state.currentChat,
    }));
  },
  setMessages: (messages) => set({ messages }),
  setCurrentChat: async (chatId) => {
    const chat = await getChatById(chatId);
    set({ currentChat: chat || null });
  },
  sendMessage: async (chatId, message) => {
    await addMessage(chatId, message);
    set((state) => {
      const updatedChat = state.chats.find((c) => c.id === chatId);
      console.log(' state.chats ', state.chats.length);
      console.log('updatedChat:', updatedChat);

      if (updatedChat) {
        updatedChat.lastMessage = message.content;
        state.updateChat(updatedChat);
      }
      console.log('Current chat:', updatedChat);
      return {
        messages: [...state.messages, message],
        currentChat: updatedChat || state.currentChat,
      };
    });
  },
}));
