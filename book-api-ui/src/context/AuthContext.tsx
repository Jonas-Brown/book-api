import { createContext, type ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

type User = {
  token: string;
  email: string;
  roles: string;
};

type AuthContextType = {
  authUser: User | null;
  setAuthUser: (value: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
});

const AuthProvider = ({ children }: props) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  return (
    <AuthContext
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext>
  );
};

export { AuthProvider, AuthContext };
