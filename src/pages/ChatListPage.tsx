import { Outlet, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { useChatStore } from '../stores/chatStore';
import { useEffect } from 'react';

function ChatListPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentChat } = useChatStore();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  useEffect(() => {
    if (currentChat) {
      navigate(`/chat/${currentChat.id}`);
    }
  }, [currentChat]);

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList
          selectedChatId={currentChat?.id}
          onChatSelect={handleChatSelect}
        />
      </div>
    );
  }

  return (
    <>
      {!currentChat?.id && <EmptyState />}
      <Outlet />
    </>
  );
}

export default ChatListPage;
