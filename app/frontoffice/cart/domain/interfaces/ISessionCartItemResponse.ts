import type { ISessionCartItem } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem';

export interface ISessionCartItemResponse {
  sessionCartItems: ISessionCartItem[];
  cartTotalItemCount: number;
  cartTotalAmount: number;
}