/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const ls = localStorage.getItem('travelUser');
      const ss = sessionStorage.getItem('travelUser');
      return ls ? JSON.parse(ls) : ss ? JSON.parse(ss) : null;
    } catch { return null; }
  });

  const login = (userData, remember = false) => {
    const data = { ...userData, isLoggedIn: true };
    setUser(data);
    if (remember) localStorage.setItem('travelUser', JSON.stringify(data));
    else sessionStorage.setItem('travelUser', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelUser');
    sessionStorage.removeItem('travelUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
