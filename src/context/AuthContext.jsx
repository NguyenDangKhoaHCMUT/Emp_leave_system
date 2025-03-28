import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('info');
    return savedUser ? JSON.parse(savedUser) : { name: null, token: null, role: null };
  });

  useEffect(() => {
    localStorage.setItem('info', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser({
      name: userData.name,
      token: userData.token,
      role: userData.role
    });
  };

  const logout = () => {
    setUser({ name: null, token: null, role: null });
    localStorage.removeItem('info');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
