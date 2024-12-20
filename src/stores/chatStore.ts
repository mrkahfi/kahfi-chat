import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import {
  addMessage,
  clearChat,
  addChat as dbAddChat,
  deleteChat,
  getChats,
  saveImage,
} from '../data/chatDatabase';

interface ChatStore {
  addChat: (name: string, image: File) => void;
  chats: Chat[];
  messages: Message[];
  currentChat: Chat | null;
  setChats: (chats: Chat[]) => void;
  updateChat: (updatedChat: Chat) => void;
  clearChat: (chat: Chat) => void;
  deleteChat: (chat: Chat) => Promise<void>;
  setMessages: (messages: Message[]) => void;
  setCurrentChat: (chatId?: string | null) => Promise<void>;
  sendMessage: (chatId: string, message: Message) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  addChat: async (name: string, image: File) => {
    const id = Date.now().toString();
    const imageBlob = new Blob([image], { type: image.type });
    await saveImage(id, imageBlob);

    const newChat: Chat = {
      id: id,
      name,
      avatar: id,
      timestamp: new Date(),
    };

    await dbAddChat(newChat);
    return set((state) => ({
      chats: [...state.chats, newChat],
      currentChat: newChat,
    }));
  },
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
  deleteChat: async (chat) => {
    deleteChat(chat.id);
    const chats = await getChats();
    return set((_) => ({
      currentChat: null,
      messages: [],
      chats: chats,
    }));
  },

  clearChat: (chat) => {
    clearChat(chat.id);
    return set((_) => ({
      currentChat: null,
      messages: [],
    }));
  },
  setMessages: (messages) => set({ messages }),
  setCurrentChat: async (chatId) => {
    set((state) => {
      const chat = state.chats.find((c) => c.id === chatId);
      return { currentChat: chat || null };
    });
  },
  sendMessage: async (chatId, message) => {
    await addMessage(chatId, message);
    set((state) => {
      const updatedChat = state.chats.find((c) => c.id === chatId);

      if (updatedChat) {
        updatedChat.lastMessage = message.content;
        if (state.currentChat?.id === chatId) {
          state.updateChat(updatedChat);
        }
      }
      return {
        messages: [...state.messages, message],
      };
    });
  },
}));
