import type { ISessionCartItem}  from '@/interfaces/ISessionCartItem';

class TotalGeneralService
{
    private sessionCartItems: Array<ISessionCartItem> = [];

    constructor(sessionCartItems: Array<ISessionCartItem>)
    {
        this.sessionCartItems = sessionCartItems;
    }

    public total = async () => {
        const total = this.sessionCartItems.value.reduce((total, item) => total + item.subtotal, 0);
        console.log(total);
    return total;
    }
}
export default TotalGeneralService;