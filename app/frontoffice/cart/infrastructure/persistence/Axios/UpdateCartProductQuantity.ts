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

    public getModifyCartItemQuantity = async (): Promise<void> => {
        await this.modifyCartItemQuantity();
    }

    private modifyCartItemQuantity = async (): Promise<void> => {

        await axios.post('http://localhost:8000/api/cart/cart-item-qty', {
                id: this.productId,
                qty: this.productQty
        });
    }
}
export default UpdateCartProductQuantity;