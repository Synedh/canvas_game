enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export default class BaseApi {
    private serverUrl: string;
    public headers: { [key: string]: string; };

    constructor() {
        this.serverUrl = process.env.SERVER_URL || 'http://localhost:3001';
        this.headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
    }

    private async fetchApi<T>(method: HTTP_METHODS, endpoint: string, body?: any): Promise<T> {
        const headers = {
            ...this.headers,
            Authorization: sessionStorage.getItem('token') || ''
        };
        return fetch(`${this.serverUrl}/${endpoint}`, {
            method,
            headers,
            body: JSON.stringify(body),
            mode: 'cors'
        }).then((response) => response.json());
    }

    public async get<T>(endpoint: string): Promise<T> {
        return this.fetchApi<T>(HTTP_METHODS.GET, endpoint);
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        return this.fetchApi<T>(HTTP_METHODS.POST, endpoint, body);
    }

    public async patch<T>(endpoint: string, body: any): Promise<T> {
        return this.fetchApi<T>(HTTP_METHODS.PATCH, endpoint, body);
    }

    public async delete<T>(endpoint: string): Promise<T> {
        return this.fetchApi<T>(HTTP_METHODS.DELETE, endpoint);
    }
}