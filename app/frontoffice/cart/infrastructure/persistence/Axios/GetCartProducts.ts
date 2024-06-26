import axios from 'axios';
import type { ISessionCartItemResponse}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse';

class GetCartProducts
{
    constructor(){}
    
    public getProductsList = async (): Promise<ISessionCartItemResponse> => {
        const productList = await axios.get<ISessionCartItemResponse>('/api/cart/get-cart-products');      
        return productList.data;         
    }
} 
export default GetCartProducts;