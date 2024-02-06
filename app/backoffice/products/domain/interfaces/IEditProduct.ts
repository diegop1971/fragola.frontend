import type { IBaseProduct } from '@app/backoffice/products/domain/interfaces/IBaseProduct'

export interface IEditProduct extends IBaseProduct {
    category_id: string;
    category_name: string;
    description: string;
    description_short: string;
    minimum_quantity: number;
    low_stock_threshold: number;
    low_stock_alert: number;
    enabled: number;
}