import { Api } from "./apiClass";
const api = new Api();

export class Team {
    private baseUrl = 'teams';

    create = (data: any) => {
        return api.post(`${this.baseUrl}`, data);
    }

    update = (data: any) => {
        return api.patch(`${this.baseUrl}/${data.id}`, data);
    }

    getTeams = (queries?: string) => {
        return api.get(`${this.baseUrl}${queries ?? ''}`);
    }

    getFilter = () => {
        return api.get(`${this.baseUrl}/filters`);
    }

    exportFile = (queries?: string) => {
        return api.get(`${this.baseUrl}/export${queries ?? ''}`);
    }
}