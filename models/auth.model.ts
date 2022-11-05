export interface AuthResponse {
    success: Boolean;
    error?: string;
    user?: User;
    token?: string;
}

export interface Credentials {
    username: string;
    password?: string;
}

export interface User {
    name: string;
}

export type UserDto = Pick<User, 'name'>;
