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
    username: string;
}
