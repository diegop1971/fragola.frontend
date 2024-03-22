import type { ISessionCartItem}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem';

class TotalGeneralService
{
    private sessionCartItems: Array<ISessionCartItem> = [];

    constructor(sessionCartItems: Array<ISessionCartItem>)
    {
        this.sessionCartItems = sessionCartItems;
    }

    public total = async () => {
        const total = this.sessionCartItems.reduce((total, item) => total + item.subtotal, 0);
    return total;
    }
}
export default TotalGeneralService;