import { Api } from "./apiClass";
const api = new Api();

export class City {
    private baseUrl = 'cities';

    create = (data: any) => {
        return api.post(`${this.baseUrl}`, data);
    }

    update = (data: any) => {
        return api.patch(`${this.baseUrl}/${data.id}`, data);
    }

    getCities = ({ page = 1, limit = 30, search = '' }: { page?: number, limit?: number, search?: string }) => {
        return api.get(`${this.baseUrl}?page=${page}&limit=${limit}&search=${search}`);
    }
}