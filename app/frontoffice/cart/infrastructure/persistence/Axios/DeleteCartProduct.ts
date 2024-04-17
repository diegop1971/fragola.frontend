import axios from 'axios';

class DeleteCartProduct
{
    private itemIndex: number;

    constructor(itemIndex: number) {
        this.itemIndex = itemIndex;
    }

    public delete = async ():Promise<void> => {
        await axios.delete('/api/cart/delete-item/' + this.itemIndex);
    }
}
export default DeleteCartProduct;