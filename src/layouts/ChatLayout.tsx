import { Outlet } from 'react-router-dom';
import { ChatList } from '../components/ChatList';
import { useEffect, useState } from 'react';
import { Chat } from '../types/chat';
import { addChat, getChats } from '../data/chatDatabase';

function ChatLayout() {
  const [chats, setChats] = useState<Chat[]>([]);

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
  };
  return (
    <div className="h-screen flex bg-white">
      <div className="w-1/3 border-r">
        <ChatList chats={chats} onNewChat={handleOnNewChat} />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
