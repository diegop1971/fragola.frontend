export interface IAuthResponse {
    success: boolean;
    data?: {
        id: string;
        name: string;
        email: string;
    };
    message?: string;
    errors?: {
        email: string[];
    };
}