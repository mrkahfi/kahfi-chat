import { useNavigate, useParams } from 'react-router-dom';
import { mockChats, mockMessages } from '../data/mockData';
import { ChatDetail } from '../components/ChatDetail';
import { useIsMobile } from '../hooks/useIsMobile';

function ChatDetailPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const isMobile = useIsMobile();

  const selectedChat = chatId
    ? mockChats.find((chat) => chat.id === chatId)
    : null;

  const messages = chatId ? mockMessages[chatId] || [] : [];

  const handleBack = () => {
    navigate('/');
  };

  if (!selectedChat) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="h-full">
      <ChatDetail
        chat={selectedChat}
        messages={messages}
        onBack={handleBack}
        isMobile={isMobile}
      />
    </div>
  );
}

export default ChatDetailPage;
