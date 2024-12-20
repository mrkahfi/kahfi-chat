import { useNavigate, useParams } from 'react-router-dom';
import { ChatDetail } from '../components/ChatDetail';
import { useEffect } from 'react';
import { getChatById } from '../data/chatDatabase';
import { useChatStore } from '../stores/chatStore';

function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const { currentChat, setCurrentChat } = useChatStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!chatId) return;

      try {
        const [fetchedChat] = await Promise.all([getChatById(chatId)]);

        if (fetchedChat) {
          setCurrentChat(fetchedChat.id);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chatId]);

  useEffect(() => {
    if (currentChat === null) {
      navigate('/');
      return;
    }
  }, [currentChat]);

  const handleBack = () => {
    setCurrentChat(null);
    navigate('/');
  };

  if (currentChat === null)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chat not found</p>
      </div>
    );
  return (
    <div className="h-full">
      <ChatDetail chat={currentChat} onBack={handleBack} />
    </div>
  );
}

export default ChatDetailPage;
