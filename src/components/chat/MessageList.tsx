import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 bg-gray-100">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}