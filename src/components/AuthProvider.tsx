import React, { createContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const initialContext: AuthContextType = {
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);

interface AuthProviderProps {
  children: React.ReactNode; // Define children prop as React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    // Simulate authentication (replace with actual authentication logic)
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    // Simulate logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
