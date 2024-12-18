import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { Chat } from '../types/chat';

function ChatListPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isMobile = useIsMobile();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handleOnNewChat = async (newChat: Chat) => {
    navigate(`/chat/${newChat.id}`);
  };

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList
          selectedChatId={chatId}
          onChatSelect={handleChatSelect}
          onNewChat={handleOnNewChat}
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
