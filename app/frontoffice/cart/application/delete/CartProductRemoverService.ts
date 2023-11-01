import { injectable } from "inversify";
import "reflect-metadata";
import container from '@app/shared/infrastructure/inversifyServiceProvider/inversify.config';
import TYPES from '@app/shared/infrastructure/inversifyServiceProvider/types';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

@injectable()
class CartProductRemoverService
{
    private itemIndex: number;

    constructor(itemIndex: number)
    {
        this.itemIndex = itemIndex;
    }

    public delete = async () => {
        const cartRepository = container.get<ICartRepository>(TYPES.ICartRepository);
        cartRepository.delete(this.itemIndex);
    }
}
export default CartProductRemoverService;