import type { IAuthRepository } from '@app/frontoffice/auth/domain/interfaces/IAuthRepository';
import type { IAuthResponse } from '@app/frontoffice/auth/domain/interfaces/IAuthResponse';

export class LoginService {
    constructor(private readonly authRepository: IAuthRepository) {}

    async execute(email: string, password: string): Promise<IAuthResponse> {
        return this.authRepository.login(email, password);
    }
}