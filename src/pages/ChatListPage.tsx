import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { useEffect, useState } from 'react';
import { Chat } from '../types/chat';
import { addChat, getChats } from '../data/chatDatabase';

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

  const handleOnNewChat = async (name: string, image: File) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name,
      avatar: URL.createObjectURL(image),
      lastMessage: '',
      timestamp: new Date(),
    };

    await addChat(newChat);
    setChats((prevChats) => [...prevChats, newChat]);
    navigate(`/chat/${newChat.id}`);
  };

  if (isMobile) {
    return (
      <div className="h-full bg-white">
        <ChatList
          chats={chats}
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
