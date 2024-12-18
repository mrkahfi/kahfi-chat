import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { getChats, initializeDatabase } from './data/chatDatabase';
import { useEffect } from 'react';
import { useChatStore } from './stores/chatStore';

function App() {
  const setChats = useChatStore((state) => state.setChats);

  useEffect(() => {
    const initializeChats = async () => {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    };

    initializeDatabase();
    initializeChats();
  }, [setChats]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
