import CartRepository from '@app/frontoffice/cart/infrastructure/persistence/CartRepository';
import CreateCartProduct from '@app/frontoffice/cart/infrastructure/persistence/Axios/CreateCartProduct';

class CartProductCreatorService
{
    private productId: string;
    private productQty: number;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public create = async () => {
        const cartRepository = new CartRepository();
        cartRepository.create(new CreateCartProduct(this.productId, this.productQty))
    }
}
export default CartProductCreatorService;