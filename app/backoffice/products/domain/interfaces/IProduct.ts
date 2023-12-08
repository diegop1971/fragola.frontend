export interface IProduct {
    id: string;
    category_id: number;
    category_name: string;
    name: string;
    description: string;
    description_short: string;
    price: number;
    minimum_quantity: number;
    low_stock_threshold: number;
    low_stock_alert: number;
    enabled: number;
    created_at: string;
    updated_at:string;
}
