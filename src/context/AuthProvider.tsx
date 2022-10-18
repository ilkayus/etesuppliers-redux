import { createContext, useState } from "react";
import { IUserData } from "types/authorization.interface";

type AuthContextType = {
  auth: IUserData | undefined;
  setAuth: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
};

const IAuthContextState = {
  auth: undefined,
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(IAuthContextState);

export const AuthProvider = ({ children }: any) => {
  const local = JSON.parse(localStorage.getItem("user") || "{}");
  const [auth, setAuth] = useState<IUserData | undefined>(
    Object.keys(local).length === 0 ? undefined : local
  );
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
