import axios from 'axios';

class CartItemRemoverService
{
    private itemIndex: number;
    private response: AxiosResponse;

    constructor(itemIndex: number) 
    {
        this.itemIndex = itemIndex;
    }

    public deleteCartItem = async (): AxiosResponse => {
        await this.deleteItem();
        return this.response;
    }

    private deleteItem = async ():Promise<void> => {
        var url = 'http://localhost:8000/api/cart/delete-item/' + this.itemIndex;
        try {
            await axios.get(url).then((response) => {
                this.response = response;
            });
        } catch(error){
            throw error;
        }
    }
}
export default CartItemRemoverService;