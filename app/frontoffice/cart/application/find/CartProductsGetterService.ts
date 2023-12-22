import { injectable } from "inversify";
import "reflect-metadata";
import container from '@app/shared/infrastructure/inversifyServiceProvider/inversify.config';
import TYPES from '@app/shared/infrastructure/inversifyServiceProvider/types';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

import type { ISessionCartItemResponse}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse';


@injectable()
class CartProductsGetterService
{
    constructor() { }

    public getCartProductsList = async (): Promise<ISessionCartItemResponse> => {
        const cartRepository = container.get<ICartRepository>(TYPES.ICartRepository);
        const response = await cartRepository.searchAll();
        return response;
    }
} 
export default CartProductsGetterService;