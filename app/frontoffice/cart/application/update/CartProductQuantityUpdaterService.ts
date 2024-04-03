import { injectable } from "inversify";
import "reflect-metadata";
import container from '@app/shared/infrastructure/inversifyServiceProvider/inversify.config';
import TYPES from '@app/shared/infrastructure/inversifyServiceProvider/types';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

@injectable()
class CartProductQuantityUpdaterService
{
    private productId: string;
    private productQty: number;

    constructor(productId: string, productQty: number)
    {
        this.productId = productId;
        this.productQty = productQty;
    }

    public update = async () => {
        const productQtyInt = this.productQty
        const cartRepository = container.get<ICartRepository>(TYPES.ICartRepository);
        cartRepository.update(this.productId, productQtyInt)
    }
}
export default CartProductQuantityUpdaterService;