import Dexie from 'dexie';
import { Chat, Message } from '../types/chat';

class ChatDatabase extends Dexie {
  chats!: Dexie.Table<Chat, string>;
  messages!: Dexie.Table<Message, string>;

  constructor() {
    super('ChatDatabase');

    this.version(1).stores({
      chats: '++id, name, lastMessage, timestamp, avatar',
      messages: '++id, content, timestamp, sender, chatId',
    });
  }
}

const db = new ChatDatabase();

export async function initializeDatabase(): Promise<void> {
  await db.open();
  const chatCount = await db.chats.count();

  if (chatCount === 0) {
    console.log('Initializing database data...');
  }
}

export async function getChats(): Promise<Chat[]> {
  await db.open();
  return db.chats.toArray();
}

export async function getChatById(chatId: string): Promise<Chat | undefined> {
  await db.open();
  return db.chats.get(chatId);
}

export async function getMessages(chatId: string): Promise<Message[]> {
  await db.open();
  return db.messages.where({ chatId }).sortBy('timestamp');
}

export async function addMessage(
  chatId: string,
  message: Message
): Promise<void> {
  await db.messages.add(message);
  await db.chats.update(chatId, {
    lastMessage: message.content,
    timestamp: message.timestamp,
  });
}

export async function addChat(chat: Chat): Promise<void> {
  await db.open();
  await db.chats.put(chat);
}
