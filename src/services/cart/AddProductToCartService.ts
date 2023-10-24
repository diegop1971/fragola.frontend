import axios from 'axios';

class AddProductToCartService
{
    private productId: string;
    private productQty:number;
    private response: AxiosResponse;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public getAddToCartResponse = async (): AxiosResponse => {
        await this.addToCart();
        return this.response;
    }

    private addToCart = async (): promise<void> => {
        try {
            this.response = await axios.post('http://localhost:8000/api/cart/add-to-cart', {
                                id: this.productId,
                                qty: this.productQty,
                            });
        } catch (error: any) {
            throw error;
        }
    }  
}
export default AddProductToCartService;