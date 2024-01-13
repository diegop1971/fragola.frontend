import router from '@/router'
import axios from 'axios';

class ErrorHandlingService
{
    constructor(){}

    public async handleApiError(error:any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 401) {
                    router.push({ name: 'login' });
                }
                return error.response.data;
            } else if (error.request) {
                return `Mensaje de error: ${error}`;
                //console.error('No se recibió una respuesta del servidor!!!!!!!!!!!!');
            } else {
                //console.error('Error al configurar la solicitud!!!!!!!!!!!!!!!!!!!!!:', error.message);
                return `Mensaje de error: ${error}`;
            }
        } else {
            return `Mensaje de error: ${error}`
        }
    }
}
export default ErrorHandlingService;