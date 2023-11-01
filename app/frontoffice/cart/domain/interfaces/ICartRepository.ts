import type { ISessionCartItemResponse}  from '@/interfaces/ISessionCartItemResponse';

export interface ICartRepository {

    searchAll(): Promise<ISessionCartItemResponse>;

    create(productId: string, productQty: number): Promise<void>;

    update(productId: string, productQty: number): Promise<void>;

    delete(itemIndex: number): Promise<void>;
}