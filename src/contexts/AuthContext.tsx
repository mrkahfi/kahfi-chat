import { createContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  login: (user: { username: string; role: string }) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  const login = (user: { username: string; role: string }) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Optional: Clear cookie
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
