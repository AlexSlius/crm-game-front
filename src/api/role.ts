import { Api } from "./apiClass";
const api = new Api();

export class Roles {
    private baseUrl = 'roles';

    getRoles = () => {
        return api.get(`${this.baseUrl}`);
    }
}