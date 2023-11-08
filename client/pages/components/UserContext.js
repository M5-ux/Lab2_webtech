import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = (user) => {
    setUser(user);
    setAuthenticated(true); // L'utilisateur est maintenant authentifié
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false); // L'utilisateur n'est plus authentifié
  };

  return (
    <UserContext.Provider value={{ user, login, logout, authenticated }}>
      {children}
    </UserContext.Provider>
  );
}
