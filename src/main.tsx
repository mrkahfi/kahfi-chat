import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="<your_client_id>">
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </GoogleOAuthProvider>
);
