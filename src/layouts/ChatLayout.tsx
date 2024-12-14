import { Outlet } from 'react-router-dom';
import { ChatList } from '../components/ChatList';
import { useEffect, useState } from 'react';
import { Chat } from '../types/chat';

function ChatLayout() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats([]);
  }, []);

  return (
    <div className="h-screen flex bg-white">
      <div className="w-1/3 border-r">
        <ChatList chats={chats} />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
