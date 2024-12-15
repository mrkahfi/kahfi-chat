import { useNavigate, useParams } from 'react-router-dom';
import { ChatDetail } from '../components/ChatDetail';
import { useEffect, useState } from 'react';
import { Chat, Message } from '../types/chat';
import { getChatById, getMessages } from '../data/chatDatabase';

function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!chatId) return;

      try {
        const [fetchedChat, fetchedMessages] = await Promise.all([
          getChatById(chatId),
          getMessages(chatId),
        ]);

        if (fetchedChat) {
          setSelectedChat(fetchedChat);
        }

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chatId]);

  const handleBack = () => {
    navigate('/');
  };

  if (!selectedChat) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="h-full">
      <ChatDetail chat={selectedChat} messages={messages} onBack={handleBack} />
    </div>
  );
}

export default ChatDetailPage;
