import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileLayout from '../layouts/MobileLayout';
import ChatListPage from '../pages/ChatListPage';
import ChatDetailPage from '../pages/ChatDetailPage';
import ChatLayout from '../layouts/ChatLayout';

export function AppRoutes() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileLayout>
        <Routes>
          <Route path="/" element={<ChatListPage />} />
          <Route path="/chat/:chatId" element={<ChatDetailPage />} />
        </Routes>
      </MobileLayout>
    );
  } else {
    return (
      <Routes>
        <Route element={<ChatLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatListPage />}>
            <Route path=":chatId" element={<ChatDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Route>
      </Routes>
    );
  }
}
