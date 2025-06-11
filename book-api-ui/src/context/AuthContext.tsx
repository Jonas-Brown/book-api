import { createContext, type ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  authUser: User | null;
  setAuthUser: (value: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }: props) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext value={{ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext>
  );
};

export { AuthProvider, AuthContext };
