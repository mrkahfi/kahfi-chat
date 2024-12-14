import { Chat, Message } from '../types/chat';

export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: 'See you tomorrow!',
    timestamp: new Date('2024-12-15T10:30:00'),
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: 'How about lunch?',
    timestamp: new Date('2024-12-15T09:15:00'),
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Carol White',
    lastMessage: 'The meeting went well',
    timestamp: new Date('2024-12-14T12:00:00'),
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Hey there!',
      timestamp: new Date('2024-12-15T10:00:00'),
      sender: 'other',
    },
    {
      id: '2',
      content: 'Hi! How are you?',
      timestamp: new Date('2024-12-15T10:15:00'),
      sender: 'user',
    },
    {
      id: '3',
      content: 'See you tomorrow!',
      timestamp: new Date('2024-12-15T10:30:00'),
      sender: 'other',
    },
  ],
};
