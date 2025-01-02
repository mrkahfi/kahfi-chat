import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import {
  addMessage,
  clearChat,
  addChat as dbAddChat,
  updateChat as dbUpdateChat,
  deleteChat,
  getChats,
  saveImage,
} from '../data/chatDatabase';

interface ChatStore {
  addChat: (name: string, image: File) => void;
  isLoadingChats: boolean;
  chats: Chat[];
  messages: Message[];
  currentChat: Chat | null;
  setIsLoadingChats: (isLoading: boolean) => void;
  setChats: () => Promise<void>;
  updateChat: ({
    name,
    image,
    id,
    lastMessage,
  }: {
    name?: string | undefined;
    image?: File | undefined;
    id?: string | undefined;
    lastMessage?: string | undefined;
  }) => Promise<void>;
  clearChat: (chat: Chat) => Promise<void>;
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

    const message: Message = {
      id: Date.now().toString(),
      chatId: newChat.id,
      content: 'Hello there! You joined the chat',
      timestamp: new Date(),
      sender: 'other',
    };

    addMessage(newChat.id, message);

    return set((state) => ({
      chats: [...state.chats, newChat],
      currentChat: newChat,
    }));
  },
  isLoadingChats: true,
  chats: [],
  messages: [],
  currentChat: null,
  setIsLoadingChats: (isLoading) => set({ isLoadingChats: isLoading }),
  setChats: async () => {
    const chats = await getChats();
    setTimeout(() => {
      set((state)=> {
        state.setIsLoadingChats(false);
        return { chats };
      });
    }, 1000);
  },
  updateChat: async ({ name, image, id, lastMessage }) => {
    if (image) {
      const imageBlob = new Blob([image], { type: image.type });
      await saveImage(id!, imageBlob);
    }

    set((state) => {
      const chat = state.chats.find((c) => c.id === id);

      if (!chat) return {};

      const updatedChat: Chat = {
        id: id ?? chat.id,
        name: name ?? chat.name,
        avatar: id ?? chat.id,
        timestamp: new Date(),
        lastMessage: lastMessage ?? chat.lastMessage,
      };

      dbUpdateChat(updatedChat);

      return {
        currentChat: updatedChat,
        chats: state.chats.map((chat) =>
          chat.id === updatedChat.id ? updatedChat : chat
        ),
      };
    });
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

  clearChat: async (chat) => {
    await clearChat(chat.id);

    set((state) => {
      const updatedChat = state.chats.find((c) => c.id === chat.id);

      if (updatedChat) {
        updatedChat.lastMessage = '';
      }
      return {
        messages: [],
      };
    });
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
          state.updateChat({ lastMessage: message.content });
        }
      }
      return {
        messages: [...state.messages, message],
      };
    });
  },
}));
