import { injectable } from "inversify";
import container from '@app/shared/infrastructure/inversifyServiceProvider/inversify.config';
import TYPES from '@app/shared/infrastructure/inversifyServiceProvider/types';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

@injectable()
class CartProductCreatorService
{
    private productId: string;
    private productQty: number;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public create = async () => {
        const cartRepository = container.get<ICartRepository>(TYPES.ICartRepository);
        cartRepository.create(this.productId, this.productQty)
    }
}
export default CartProductCreatorService;