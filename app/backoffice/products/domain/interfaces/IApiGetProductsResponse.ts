import type { IProduct } from './IProduct';

export interface IApiGetProductsResponse {
    title: string;
    productList: IProductList;
}

export interface IProductList extends IProduct {
  // agregar propiedades específicas de IProductList, si las hay.
}
