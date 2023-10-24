import axios from 'axios';
import type { ISessionCartItem }  from '@/interfaces/ISessionCartItem';

class GetCartProductsService
{
    private response: Array<ISessionCartItem> = [];

    constructor(){}
    
    public getProductsList = async (): Array<ISessionCartItem> => {
        await this.getProducts();
        return this.response;
    } 

    private getProducts = async (): promise<void> => {
        try {
            this.response = await axios.get('http://localhost:8000/api/cart/axios');
        } catch(error) {
            throw error;
        }
    }
}
export default GetCartProductsService;