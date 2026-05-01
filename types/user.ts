export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'BARBER';
    created_at: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface DeleteUserRequest {
    email_confirmation: string;
}