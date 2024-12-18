import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { useChatStore } from '../stores/chatStore';
import { useEffect } from 'react';

function ChatListPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isMobile = useIsMobile();
  const { currentChat } = useChatStore();

  console.log('chatListPage ', chatId);

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  useEffect(() => {
    if (currentChat && currentChat.id !== chatId) {
      navigate(`/chat/${currentChat.id}`);
    }
  }, [currentChat]);

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList selectedChatId={chatId} onChatSelect={handleChatSelect} />
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
