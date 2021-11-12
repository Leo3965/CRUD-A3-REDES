import {User} from "../types/User";
import {createContext, FunctionComponent, useContext, useEffect, useState} from "react";
import {IocContext} from "./IocContext";

interface IAuthContext {
    signed: boolean;
    user: User | null
    token: string | null
    signIn: (login: string, password: string) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext<IAuthContext>({
    signed: false,
    user: null,
    token: null,
    signIn: (login: string, password: string) => Promise.resolve(),
    signOut: () => {
    }
})

export const AuthProvider: FunctionComponent = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const {apiClient} = useContext(IocContext)

    useEffect(() => {
        setUser(JSON.parse(localStorage.get('user')));
        setToken(localStorage.get('token'))
        setLoading(false);
    }, [])

    const signIn = async (login: string, password: string) => {
        const {token} = await apiClient.auth(login, password);
        const user = await apiClient.getAuth(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const signOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{signed: Boolean(user), user, signIn, signOut, token}}>
            {loading ? <div>Loading...</div> : (children)}
        </AuthContext.Provider>
    )
}