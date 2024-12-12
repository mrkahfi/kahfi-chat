import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800'
        }`}
      >
        <p>{message.content}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
