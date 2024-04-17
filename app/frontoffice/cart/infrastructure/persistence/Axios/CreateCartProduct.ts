import axios from 'axios';

class CreateCartProduct
{
    private productId: string;
    private productQty: number;

constructor(productId: string, productQty: number) { 
    this.productId = productId;
    this.productQty = productQty;
}

    public create = async (): Promise<void> => {
        await axios.post('/api/cart/add-to-cart', {
            id: this.productId,
            qty: this.productQty,
        });
    } 
} 
export default CreateCartProduct;