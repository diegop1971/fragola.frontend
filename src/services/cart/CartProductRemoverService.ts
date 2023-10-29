import axios from 'axios';

class CartProductRemoverService
{
    private itemIndex: number;

    constructor(itemIndex: number) {
        this.itemIndex = itemIndex;
    }

    public deleteCartProduct = async (): Promise<void> => {
        await this.delete();
    }

    private delete = async ():Promise<void> => {
        await axios.delete('http://localhost:8000/api/cart/delete-item/' + this.itemIndex);
    }
}
export default CartProductRemoverService;