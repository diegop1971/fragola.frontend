import { injectable } from "inversify";
import axios from 'axios';
import type { IAuthRepository } from '@app/frontoffice/auth/domain/interfaces/IAuthRepository';
import type { IAuthResponse } from '@app/frontoffice/auth/domain/interfaces/IAuthResponse';

@injectable()
export class AxiosAuthRepository implements IAuthRepository 
{
    async login(email: string, password: string): Promise<IAuthResponse> {
        await axios.get('/sanctum/csrf-cookie');

        const response = await axios.post('/login', { email, password });
        return response.data;
    }
}