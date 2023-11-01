import { injectable } from "inversify";
import "reflect-metadata";
import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';
import GetCartProducts from '@app/frontoffice/cart/infrastructure/persistence/Axios/GetCartProducts';
import CreateCartProduct from '@app/frontoffice/cart/infrastructure/persistence/Axios/CreateCartProduct';
import type { ICartRepository } from '@app/frontoffice/cart/domain/interfaces/ICartRepository';
import UpdateCartProductQuantity from "./Axios/UpdateCartProductQuantity";
import DeleteCartProduct from "./Axios/DeleteCartProduct";

@injectable()
class CartRepository implements ICartRepository
{
  constructor() { }

  public searchAll = async (): Promise<ISessionCartItemResponse> => {
    const getCartProducts = new GetCartProducts();
    return await getCartProducts.getProductsList();
  }

  public create = async (productId: string, productQty: number): Promise<void> => {
    const createCartProduct = new CreateCartProduct(productId, productQty);
    createCartProduct.create();
  }

  public update = async (productId: string, productQty: number): Promise<void> => {
    const createCartProduct = new UpdateCartProductQuantity(productId, productQty);
    createCartProduct.update();
  }

  public delete = async (itemIndex: number) => {
    const deleteCartProduct = new DeleteCartProduct(itemIndex);
    deleteCartProduct.delete();
  }

}
export default CartRepository
