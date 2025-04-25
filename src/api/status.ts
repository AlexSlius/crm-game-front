import { Api } from "./apiClass";
const api = new Api();

export class Status {
    private baseUrl = 'statuses';

    getStatuses = () => {
        return api.get(`${this.baseUrl}`);
    }
}