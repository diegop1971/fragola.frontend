import axios from 'axios';

class UpdateCartProductQuantity
{
    private productId: string;
    private productQty: number;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public update = async (): Promise<void> => {
        await axios.post('/api/cart/cart-item-qty', {
                id: this.productId,
                qty: this.productQty
        });
    }
}
export default UpdateCartProductQuantity;