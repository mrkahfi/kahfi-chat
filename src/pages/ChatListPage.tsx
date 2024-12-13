import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { mockChats } from '../data/mockData';
import { EmptyState } from '../components/chat/EmptyState';

function ChatListPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isMobile = useIsMobile();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList
          chats={mockChats}
          selectedChatId={chatId}
          onChatSelect={handleChatSelect}
        />
      </div>
    );
  }

  return (
    <>
      {!chatId && <EmptyState />}
      <Outlet />
    </>
  );
}

export default ChatListPage;
