import BaseApi from "./base.api";
import { AuthResponse, Credentials, User } from '../../../models/auth.model';

export class AuthApi extends BaseApi {
    public async login(credentials: Credentials): Promise<{ user: User, token: string }> {
        const response = await this.post<AuthResponse>('auth/login', credentials);
        if (response.error || !(response.token && response.user)) {
            throw Error(response.error);
        }
        return {
            user: response.user,
            token: response.token
        };
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