import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getCurrentUser } from "../service/authService";

interface UserContextType {
  user: { username: string; role: string } | null;
  setUser: (user: { username: string; role: string } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    getCurrentUser()
  );

  useEffect(() => {
    setUser(getCurrentUser()); // Initialize user from local storage
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
