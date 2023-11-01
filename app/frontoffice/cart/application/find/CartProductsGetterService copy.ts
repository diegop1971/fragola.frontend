import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import CartRepository from '@app/frontoffice/cart/infrastructure/persistence/CartRepository';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';

class CartProductsGetterService
{
    private getCartProducts: GetCartProducts;

    constructor() {
        this.getCartProducts = new GetCartProducts();
    }
    
    public getCartProductsList = async (): Promise<ISessionCartItemResponse> => {
        const cartRepository = new CartRepository();
        const productCartList = cartRepository.searchAll(this.getCartProducts);
        return productCartList;   
    }
} 
export default CartProductsGetterService;