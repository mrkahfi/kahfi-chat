import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { ChatList } from '../components/ChatList';
import { EmptyState } from '../components/chat/EmptyState';
import { Chat } from '../types/chat';
import { addChat, saveImage } from '../data/chatDatabase';
import { useChats } from '../hooks/chatHooks';

function ChatListPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isMobile = useIsMobile();
  const { chats, setChats } = useChats();

  const handleChatSelect = (selectedChatId: string) => {
    navigate(`/chat/${selectedChatId}`);
  };

  const handleOnNewChat = async (name: string, image: File) => {
    const id = Date.now().toString();
    const imageBlob = new Blob([image], { type: image.type });
    await saveImage(id, imageBlob);

    const newChat: Chat = {
      id: id,
      name,
      avatar: id,
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
