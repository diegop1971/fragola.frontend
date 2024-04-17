import axios from 'axios';

class LogoutService 
{
    constructor() {
        this.logout();
    }

    async logout():Promise<void> {
        try {
            const response = await axios.post("/logout");

            if (response.status === 204) {
                console.log("Sesión cerrada exitosamente.");
            } else {
                console.log(`Error al cerrar sesión: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

}
export default LogoutService;