import type { IBaseStockItem } from '@app/backoffice/stock/domain/interfaces/IBaseStockItem';

export interface ICreateStockItem extends IBaseStockItem {
    category_name: string
    product_name: string
    stock_movemente_type_name: string
}