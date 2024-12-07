import React, { useState } from 'react';
import { ChatList } from './components/ChatList';
import { ChatDetail } from './components/ChatDetail';
import { useIsMobile } from './hooks/useIsMobile';
import { mockChats, mockMessages } from './data/mockData';

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const selectedChat = selectedChatId 
    ? mockChats.find(chat => chat.id === selectedChatId)
    : null;

  const messages = selectedChatId ? (mockMessages[selectedChatId] || []) : [];

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  if (isMobile) {
    return (
      <div className="h-screen bg-white">
        {!selectedChatId ? (
          <ChatList
            chats={mockChats}
            selectedChatId={selectedChatId}
            onChatSelect={handleChatSelect}
          />
        ) : (
          <ChatDetail
            chat={selectedChat}
            messages={messages}
            onBack={handleBack}
            isMobile={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white">
      <div className="w-1/3 border-r">
        <ChatList
          chats={mockChats}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
        />
      </div>
      <div className="flex-1">
        <ChatDetail
          chat={selectedChat}
          messages={messages}
          onBack={handleBack}
          isMobile={false}
        />
      </div>
    </div>
  );
}

export default App;