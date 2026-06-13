import axios from 'axios';
import type { IAuthResponse } from '@app/frontoffice/auth/domain/interfaces/IAuthResponse';

class LoginService 
{
    private loginData: IAuthResponse;
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

    private async fetchAll(): Promise<IAuthResponse> {

        await axios.get("/sanctum/csrf-cookie"); 

        const response = await axios.post("/login", {
            email: this.email,
            password: this.password,
        });

        const responseData = await response.data;
        return responseData;
    }
}
export default LoginService;