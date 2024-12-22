import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { getChats, initializeDatabase } from './data/chatDatabase';
import { useEffect } from 'react';
import { useChatStore } from './stores/chatStore';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <AppRoutes />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

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

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
