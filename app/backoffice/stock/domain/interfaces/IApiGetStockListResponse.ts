import type { IViewStockList } from '@app/backoffice/stock/domain/interfaces/IViewStockList';

export interface IApiGetStockListResponse {
    title: string;
    stockList: IStockList;
}

export interface IStockList extends IViewStockList {
  // agregar propiedades específicas de IProductList, si las hay.
}
