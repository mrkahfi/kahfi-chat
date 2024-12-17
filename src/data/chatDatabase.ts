import Dexie from 'dexie';
import { Chat, Message } from '../types/chat';

class ChatDatabase extends Dexie {
  chats!: Dexie.Table<Chat, string>;
  messages!: Dexie.Table<Message, string>;
  images!: Dexie.Table<{ id: string; blob: Blob }, string>;

  constructor() {
    super('ChatDatabase');

    this.version(1).stores({
      chats: '++id, name, lastMessage, timestamp, avatar',
      messages: '++id, content, timestamp, sender, chatId',
      images: 'id, blob',
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

export async function saveImage(id: string, blob: Blob): Promise<void> {
  await db.open();
  await db.images.put({ id, blob });
}

export async function getImage(id: string): Promise<Blob | undefined> {
  await db.open();
  const image = await db.images.get(id);
  return image?.blob;
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
  console.log(message);
  await db.open();
  await db.messages.add({ ...message, chatId });
  await db.chats.update(chatId, {
    lastMessage: message.content,
    timestamp: message.timestamp,
  });
}

export async function addChat(chat: Chat): Promise<void> {
  await db.open();
  await db.chats.put(chat);
}

export async function deleteChat(chatId: string): Promise<void> {
  await db.open();
  await db.chats.delete(chatId);
  await db.messages.where({ chatId }).delete();
  await db.images.where({ chatId }).delete();
}

export async function clearChat(chatId: string): Promise<void> {
  await db.open();
  await db.messages.where({ chatId }).delete();
}
