import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileLayout from '../layouts/MobileLayout';
import ChatListPage from '../pages/ChatListPage';
import ChatDetailPage from '../pages/ChatDetailPage';
import DesktopLayout from '../layouts/DesktopLayout';
import LoginPage from '../pages/LoginPage';

export function AppRoutes() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat" element={<Navigate to="/chat" replace />} />
          <Route path="/chat/:chatId" element={<ChatDetailPage />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </MobileLayout>
    );
  } else {
    return (
      <Routes>
        <Route index path="/" element={<LoginPage />}></Route>
        <Route element={<DesktopLayout />}>
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
