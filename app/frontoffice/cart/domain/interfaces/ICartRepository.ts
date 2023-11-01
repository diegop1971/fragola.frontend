import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';
import CreateCartProduct from '@app/frontoffice/cart/infrastructure/persistence/Axios/CreateCartProduct';

export interface ICartRepository {

    searchAll(getCartProducts: GetCartProducts): Promise<ISessionCartItemResponse>;

    create(createCartProduct: CreateCartProduct): Promise<void>;
}