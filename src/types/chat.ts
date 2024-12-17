export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  avatar: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
  chatId: string;
}
