import { Outlet } from 'react-router-dom';
import { ChatList } from '../components/ChatList';

function ChatLayout() {
  return (
    <div className="h-screen flex bg-white">
      <div className="w-1/3 border-r">
        <ChatList />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
