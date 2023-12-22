import type { ISessionCartItemResponse}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse';

export interface ICartRepository {

    searchAll(): Promise<ISessionCartItemResponse>;

    create(productId: string, productQty: number): Promise<void>;

    update(productId: string, productQty: number): Promise<void>;

    delete(itemIndex: number): Promise<void>;
}