import {User} from "../types/User";

interface AuthResponse {
    token: string;
}

export class ApiClient {
    constructor(private baseUrl: string) {
    }

    async auth(login: string, password: string) {
        return {
            token: 'teste'
        }
    }

    async getAuth(token: string): Promise<User> {
        return Promise.resolve({
            login: 'teste',
            name: 'teste'
        })
    }

    createUser(name: string, login: string, password: string) {
        return Promise.resolve({name, login, password})
    }
}