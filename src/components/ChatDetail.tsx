import { Chat, Message } from '../types/chat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmptyState } from './chat/EmptyState';

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
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  if (!chat) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader chat={chat} onBack={onBack} isMobile={isMobile} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
