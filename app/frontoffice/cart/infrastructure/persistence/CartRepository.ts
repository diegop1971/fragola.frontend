import { injectable } from "inversify";
import "reflect-metadata";
import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';
import CreateCartProduct from '@app/frontoffice/cart/infrastructure/persistence/Axios/CreateCartProduct';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';

@injectable()
class CartRepository implements ICartRepository
{
  //private cartProductsList: ISessionCartItemResponse;

  constructor() { 
    //this.cartProductsList = [];
  }

  public searchAll = async (getCartProducts: GetCartProducts): Promise<ISessionCartItemResponse> => {
    return await getCartProducts.getProductsList();
  }

  public create = async (createCartProduct: CreateCartProduct): Promise<void> => {
    createCartProduct.create();
  }
}
export default CartRepository
