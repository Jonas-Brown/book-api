import { createContext, type ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (value: User | null) => void;
  authToken: string | null;
  setAuthToken: (value: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  authToken: null,
  setAuthToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  return (
    <AuthContext
      value={{
        user,
        setUser,
        authToken,
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext>
  );
};

export { AuthProvider, AuthContext };
