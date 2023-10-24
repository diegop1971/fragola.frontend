import axios from 'axios';

class ModifyCartItemQuantityService
{
    private productId: string;
    private productQty: number;
    private response: AxiosResponse;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public getModifyCartItemQuantity = async () => {
        await this.modifyCartItemQuantity();
        return this.response;
    }

    private modifyCartItemQuantity = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/cart/cart-item-qty', {
                id: this.productId,
                qty: this.productQty
            });
            this.response = response;

        } catch (error) {
            throw error;
        }
    }
}
export default ModifyCartItemQuantityService;