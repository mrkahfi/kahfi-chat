import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useEffect } from 'react';
import { useChatStore } from './stores/chatStore';

import { createBrowserRouter } from 'react-router-dom';
import { initializeDatabase } from './data/chatDatabase';

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
  const { setChats } = useChatStore();

  useEffect(() => {
    const initializeChats = async () => {
      setChats();
    };

    initializeDatabase();
    initializeChats();
  }, [setChats]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
