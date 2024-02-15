import type { IStockItem } from '@app/backoffice/stock/domain/interfaces/IStockItem';

export interface IApiGetStockListSuccessResponse {
    title: string;
    stockItem: IStockItem[];
}
