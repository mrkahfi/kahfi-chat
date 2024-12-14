import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { useEffect, useState } from 'react';
import { Chat } from '../types/chat';
import { getChats } from '../data/chatDatabase';

function ChatListPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isMobile = useIsMobile();
  const [chats, setChats] = useState<Chat[]>([]);

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    };

    fetchChats();
  }, []);

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList
          chats={chats}
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
