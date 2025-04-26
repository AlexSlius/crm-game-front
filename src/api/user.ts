import { Api } from "./apiClass";
const api = new Api();

export class User {
    private baseUrl = 'users/';

    create = (data: any) => {
        return api.post(`${this.baseUrl}`, data);
    }

    update = (data: any) => {
        return api.patch(`${this.baseUrl}${data.id}`, data);
    }

    getUserCurrent = () => {
        return api.get(`${this.baseUrl}token`);
    }

    getUsers = ({ page = 1, limit = 30 }: { page: number, limit: number }) => {
        return api.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
    }

    updatePassword = ({ userId, password }: { userId: number, password: string }) => {
        return api.patch(`${this.baseUrl}update-password/${userId}`, { password });
    }

    forgotPassword = (email: string) => {
        return api.post(`${this.baseUrl}forgot-password`, { email });
    }
}