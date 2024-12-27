import { Chat, Message } from '../types/chat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmptyState } from './chat/EmptyState';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getMessages } from '../data/chatDatabase';
import { useChatStore } from '../stores/chatStore';
import { ConfirmDialog } from './ConfirmDialog';
import { ChatFormDialog } from './ChatFormDialog';

interface ChatDetailProps {
  chat: Chat;
  onBack: () => void;
}

export function ChatDetail({ chat, onBack }: ChatDetailProps) {
  const {
    messages,
    setMessages,
    sendMessage,
    deleteChat,
    clearChat,
    currentChat,
    updateChat,
  } = useChatStore();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [isChatFormDialogOpen, setIsChatFormDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!chat.id) return;

      try {
        const [fetchedMessages] = await Promise.all([getMessages(chat.id)]);

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chat?.id]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      sender: 'user',
      chatId: chat.id,
    };
    sendMessage(chat.id, newMessage);

    setTimeout(() => {
      const serverResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: 'You wrote "' + message + '"',
        timestamp: new Date(),
        sender: 'other',
        chatId: chat.id,
      };
      sendMessage(chat.id, serverResponse);
    }, 1000);
  };

  const handleClear = () => {
    if (chat) {
      clearChat(chat);
    }
  };

  const handleDelete = () => {
    if (chat) {
      setIsConfirmDialogOpen(true);
    }
  };

  const handleEdit = () => {
    setIsChatFormDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmDialogOpen(false);

    deleteChat(chat);
  };

  const handleSave = async (name: string, image: File) => {
    updateChat({ name: name, image: image, id: currentChat?.id });
  };

  useEffect(() => {
    if ((!currentChat || currentChat.id !== chat.id) && onBack) {
      onBack();
    }
  }, [currentChat]);

  if (!chat) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">
      <ChatHeader
        chat={chat}
        onBack={onBack}
        onClickEdit={handleEdit}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <MessageList
        messages={messages.map((msg) => ({
          ...msg,
          formattedTimestamp: format(new Date(msg.timestamp), 'HH:mm'),
        }))}
      />
      <MessageInput onSendMessage={handleSendMessage} />
      <ConfirmDialog
        onSave={handleConfirmDelete}
        onClose={() => setIsConfirmDialogOpen(false)}
        isOpen={isConfirmDialogOpen}
        title="Konfirmasi"
      >
        <div className="text-sm mb-2">Yakin akan menghapus </div>
      </ConfirmDialog>

      <ChatFormDialog
        chat={currentChat}
        isOpen={isChatFormDialogOpen}
        onClose={() => setIsChatFormDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
