//import { getProduct, createProduct, updateProduct, deleteProduct } from '@/api';

import CartProductsGetter from '@/services/cart/CartProductsGetterService';

import type { ISessionCartItem }  from '@/interfaces/ISessionCartItem';

export default class CartRepository {
  
  async getAll(): Promise<ISessionCartItem> {
    return await CartProductsGetter();
  }
}

