import axios from 'axios';

class CartProductCreatorService
{
    private productId: string;
    private productQty:number;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public getAddToCartResponse = async (): Promise<void> => {
        await this.addToCart();
    }

    private addToCart = async (): Promise<void> => {
        await axios.post('http://localhost:8000/api/cart/add-to-cart', {
            id: this.productId,
            qty: this.productQty,
        });
    } 
}
export default CartProductCreatorService;