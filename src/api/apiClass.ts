import config from "../config.json";

export class Api {
    constructor() { }

    async post(url: string, data: any = '') {
        return await this.apiFatch({ url, type: 'POST', data })
    }

    async get(url: string) {
        return await this.apiFatch({ url, type: 'GET' })
    }

    async patch(url: string, data: any) {
        return await this.apiFatch({ url, type: 'PATCH', data })
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }

    async apiFatch({
        url,
        type,
        data,
    }: {
        url: string;
        type: string,
        data?: any
    }) {
        try {
            const res = await fetch(`${config.API}${url}`, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`,
                },
                ...(type !== 'GET' && !!data ? { body: JSON.stringify(data) } : {})
            });

            return res.json();
        } catch (error) {
            console.log("error: ", error);

            return error;
        }
    }
}