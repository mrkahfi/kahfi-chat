import { Chat, Message } from '../types/chat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmptyState } from './chat/EmptyState';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { clearChat, deleteChat, getMessages } from '../data/chatDatabase';
import { useChatStore } from '../stores/chatStore';

interface ChatDetailProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatDetail({ chat, onBack }: ChatDetailProps) {
  const { messages, setMessages, sendMessage } = useChatStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!chat?.id) return;

      try {
        const [fetchedMessages] = await Promise.all([getMessages(chat.id)]);

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chat?.id]);

  console.log('messages: ');

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      sender: 'user',
      chatId: chat.id,
    };
    sendMessage(chat.id, newMessage);

    setTimeout(() => {
      const serverResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: 'You wrote "' + message + '"',
        timestamp: new Date(),
        sender: 'other',
        chatId: chat.id,
      };
      sendMessage(chat.id, serverResponse);
    }, 2000);
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
        messages={messages.map((msg) => ({
          ...msg,
          formattedTimestamp: format(new Date(msg.timestamp), 'HH:mm'),
        }))}
      />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
