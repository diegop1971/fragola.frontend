import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';
import CreateCartProduct from '@app/frontoffice/cart/infrastructure/persistence/Axios/CreateCartProduct';

class CartAxiosRepository {

  constructor() { }

  public searchAll = async (getCartProducts: GetCartProducts): Promise<ISessionCartItemResponse> => {
    return await getCartProducts.getProductsList();
  }

  public create = async (createCartProduct: CreateCartProduct): Promise<void> => {
    createCartProduct.create();
  }
}
export default CartAxiosRepository
