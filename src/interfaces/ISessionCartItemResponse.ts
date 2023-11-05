import type { ISessionCartItem } from './ISessionCartItem';

export interface ISessionCartItemResponse {
  sessionCartItems: ISessionCartItem[];
  cartTotalItemCount: number;
  cartTotalAmount: number;
}