import { Chat, Message } from '../types/chat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmptyState } from './chat/EmptyState';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  addMessage,
  clearChat,
  deleteChat,
  getMessages,
} from '../data/chatDatabase';

interface ChatDetailProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatDetail({ chat, onBack }: ChatDetailProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  console.log('chat?.id ', chat?.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!chat?.id) return;

      try {
        const [fetchedMessages] = await Promise.all([getMessages(chat.id)]);

        setChatMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chat?.id]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      sender: 'user',
      chatId: chat.id,
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    addMessage(chat.id, newMessage);

    setTimeout(() => {
      const serverResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'You wrote "' + message + '"',
        timestamp: new Date(),
        sender: 'other',
        chatId: chat.id,
      };
      setChatMessages((prevMessages) => [...prevMessages, serverResponse]);
      addMessage(chat.id, serverResponse);
    }, 1000);
  };

  const handleClear = () => {
    if (chat) {
      clearChat(chat.id);
    }
  };

  const handleDelete = () => {
    if (chat) {
      deleteChat(chat.id);
    }
  };

  if (!chat) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader
        chat={chat}
        onBack={onBack}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <MessageList
        messages={chatMessages.map((msg) => ({
          ...msg,
          formattedTimestamp: format(new Date(msg.timestamp), 'HH:mm'),
        }))}
      />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
