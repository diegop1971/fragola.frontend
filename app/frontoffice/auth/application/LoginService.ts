import axios from 'axios';
import type { IAuthenticationResult } from '@app/frontoffice/auth/domain/interfaces/IAuthenticationResult';

class LoginService 
{
    private loginData: IAuthenticationResult;
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.loginData = {success:true};
        this.email = email;
        this.password = password;
    }

    async getLoginData() {
        this.loginData = await this.fetchAll();
        return this.loginData ;
    }

    private async fetchAll(): Promise<IAuthenticationResult> {

        await axios.get("http://localhost:8000/sanctum/csrf-cookie"); 

        const response = await axios.post("http://localhost:8000/login", {
            email: this.email,
            password: this.password,
        });

        const responseData = await response.data;
        return responseData;
    }
}
export default LoginService;