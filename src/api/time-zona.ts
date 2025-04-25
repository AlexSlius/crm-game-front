import { Api } from "./apiClass";
const api = new Api();

export class TimeZona {
    private baseUrl = 'time-zones';

    getTimeZones = ({ search = '' }: { search?: string }) => {
        return api.get(`${this.baseUrl}?search=${search}`);
    }
}