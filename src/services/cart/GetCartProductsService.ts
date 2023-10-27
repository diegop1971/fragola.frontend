import axios from 'axios';
import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';

class GetCartProductsService
{
    constructor(){}
    
    public getProductsList = async (): Promise<ISessionCartItemResponse> => {
        const productList = await axios.get<ISessionCartItemResponse>('http://localhost:8000/api/cart/get-cart-products');        
        return productList.data;         
    }
} 
export default GetCartProductsService;