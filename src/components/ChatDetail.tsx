import { Chat, Message } from '../types/chat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmptyState } from './chat/EmptyState';
import { useState } from 'react';

interface ChatDetailProps {
  chat: Chat | null;
  messages: Message[];
  onBack: () => void;
  isMobile: boolean;
}

export function ChatDetail({
  chat,
  messages,
  onBack,
  isMobile,
}: ChatDetailProps) {
  const [chatMessages, setChatMessages] = useState(messages);
  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date()
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .toLocaleUpperCase(),
      sender: 'user',
    };
    setChatMessages([...chatMessages, newMessage]);

    // Simulate server response
    setTimeout(() => {
      const serverResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated server response.',
        timestamp: new Date()
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          .toLocaleUpperCase(),
        sender: 'other',
      };
      setChatMessages((prevMessages) => [...prevMessages, serverResponse]);
    }, 1000); // 1 second delay
  };

  if (!chat) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader chat={chat} onBack={onBack} isMobile={isMobile} />
      <MessageList messages={chatMessages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
