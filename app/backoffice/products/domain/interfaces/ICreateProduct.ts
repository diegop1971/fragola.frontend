import type { IBaseProduct } from '@app/backoffice/products/domain/interfaces/IBaseProduct'

export interface ICreateProduct extends IBaseProduct {
    category_id: number;
    category_name: string;
    description: string;
    description_short: string;
    minimum_quantity: number;
    low_stock_threshold: number;
    low_stock_alert: number;
    enabled: number;
}