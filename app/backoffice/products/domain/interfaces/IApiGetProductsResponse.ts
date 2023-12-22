import type { IViewProduct } from './IViewProduct';

export interface IApiGetProductsResponse {
    title: string;
    productList: IProductList;
}

export interface IProductList extends IViewProduct {
  // agregar propiedades específicas de IProductList, si las hay.
}
