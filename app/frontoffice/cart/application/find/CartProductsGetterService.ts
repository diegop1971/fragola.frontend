import { injectable } from "inversify";
import "reflect-metadata";
import container from '@app/shared/infrastructure/inversifyServiceProvider/inversify.config';
import TYPES from '@app/shared/infrastructure/inversifyServiceProvider/types';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';

@injectable()
class CartProductsGetterService
{
    constructor() { }

    public getCartProductsList = async (): Promise<ISessionCartItemResponse> => {
        const getCartProducts = container.get<ICartRepository>(TYPES.ICartRepository);
        const response = await getCartProducts.searchAll((new GetCartProducts));
        return response;
    }
} 
export default CartProductsGetterService;