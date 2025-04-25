import { Api } from "./apiClass";
const api = new Api();

export class Games {
    private baseUrl = 'games';

    create = (data: any) => {
        return api.post(`${this.baseUrl}`, data);
    }

    update = (data: any) => {
        return api.patch(`${this.baseUrl}/${data.id}`, data);
    }

    getGames = (queries?: string) => {
        return api.get(`${this.baseUrl}${queries ?? ''}`);
    }
}