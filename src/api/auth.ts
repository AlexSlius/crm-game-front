import { Api } from "./apiClass";
const api = new Api();

export class Auth {
    private baseUrl = 'auth/';

    login = (data: { email: string; password: string }) => {
        return api.post(`${this.baseUrl}login`, data);
    }

    logout = () => {
        return api.post(`${this.baseUrl}logout`);
    }
}