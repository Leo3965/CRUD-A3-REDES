import {ApiClient} from "../clients/ApiClient";
import {createContext, FunctionComponent, useEffect, useState} from "react";

interface IIocContext {
    apiClient: ApiClient
}

interface IocProviderProps {
    apiHost: string;
}

export const IocContext = createContext<IIocContext>({
    apiClient: new ApiClient('')
})

export const IocProvider: FunctionComponent<IocProviderProps> = ({apiHost, children}) => {
    const [apiClient, setApiClient] = useState(new ApiClient(''))

    useEffect(() => {
        setApiClient(new ApiClient(apiHost))
    }, [apiHost])

    return <IocContext.Provider value={{apiClient}}>
        {children}
    </IocContext.Provider>
}