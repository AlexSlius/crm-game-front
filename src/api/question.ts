import { Api } from "./apiClass";
const api = new Api();

export class Questions {
    private baseUrl = 'questions';

    create = (data: any) => {
        return api.post(`${this.baseUrl}`, data);
    }

    update = (data: any) => {
        return api.patch(`${this.baseUrl}/${data.id}`, data);
    }

    getQuestions = ({ page = 1, limit = 30, status = 9 }: { page?: number, limit?: number, status: number }) => {
        return api.get(`${this.baseUrl}?page=${page}&limit=${limit}&status=${status}`);
    }
}