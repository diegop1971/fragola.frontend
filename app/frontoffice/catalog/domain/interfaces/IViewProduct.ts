import type { IBaseProduct } from '@app/backoffice/products/domain/interfaces/IBaseProduct'

export interface IViewProduct extends IBaseProduct {
    category_id: string;
    category_name: string;
    description: string;
    description_short: string;
    low_stock_threshold: number;
    low_stock_alert: number;
    enabled: number;
    created_at: string;
    updated_at: string;
}
