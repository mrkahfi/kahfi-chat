import { useNavigate, useParams } from 'react-router-dom';
import { ChatDetail } from '../components/ChatDetail';
import { useEffect, useState } from 'react';
import { Chat } from '../types/chat';
import { getChatById } from '../data/chatDatabase';

function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!chatId) return;

      try {
        const [fetchedChat] = await Promise.all([getChatById(chatId)]);

        if (fetchedChat) {
          setSelectedChat(fetchedChat);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chatId]);

  const handleBack = () => {
    navigate('/');
  };

  if (selectedChat === null)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chat not found</p>
      </div>
    );
  return (
    <div className="h-full">
      <ChatDetail chat={selectedChat} onBack={handleBack} />
    </div>
  );
}

export default ChatDetailPage;
