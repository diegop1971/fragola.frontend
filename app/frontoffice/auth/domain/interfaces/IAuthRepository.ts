import type { IAuthResponse } from './IAuthResponse';

export interface IAuthRepository {
    login(email: string, password: string): Promise<IAuthResponse>;
}