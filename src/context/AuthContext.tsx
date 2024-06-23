import React from 'react';

export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);
