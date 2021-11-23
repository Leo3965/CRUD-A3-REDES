import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { IocContext } from "./IocContext";

interface IAuthContext {
  signed: boolean;
  user: User | null;
  token: string | null;
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  signed: false,
  user: null,
  token: null,
  signIn: (login: string, password: string) => Promise.resolve(),
  signOut: () => {},
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { apiClient } = useContext(IocContext);

  useEffect(() => {
    setUser(JSON.parse(String(localStorage.getItem("user"))));
    setToken(localStorage.getItem("token"));
    setLoading(false);
  }, []);

  const signIn = async (login: string, password: string) => {
    const { jwt } = await apiClient.auth(login, password);
    const user = await apiClient.getAuth(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setToken(jwt);
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signIn, signOut, token }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
