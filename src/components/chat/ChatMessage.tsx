import { format } from 'date-fns';
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
        className={`max-w-[70%] p-3 ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl'
            : 'bg-white text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl'
        }`}
      >
        <p>{message.content}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {format(new Date(message.timestamp), 'HH:mm')}
        </span>
      </div>
    </div>
  );
}
