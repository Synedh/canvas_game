import BaseApi from "./base.api";
import { AuthResponse, Credentials, User } from '../../../models/auth.model';

export class AuthApi extends BaseApi {
    public async login(credentials: Credentials): Promise<User> {
        const response = await this.post<AuthResponse>('auth/login', credentials);
        if (response.error || !(response.token && response.user)) {
            throw Error(response.error);
        }
        sessionStorage.setItem('token', response.token);
        return response.user;
    }

    public async logout(): Promise<User> {
        const token = sessionStorage.getItem('token');
        const response = await this.post<AuthResponse>('auth/logout', { token });
        if (response.error || !(response.user)) {
            throw Error(response.error);
        }
        sessionStorage.removeItem('token');
        return response.user;
    }
}