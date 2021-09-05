export interface LoginData {
    email: string;
    password: string;
}

export interface SessionData {
    token: string;
}

export interface SessionContextData {
    handleLogin(token: string): void;
    handleLogout(): void;
}
