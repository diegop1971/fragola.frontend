import type { IViewProduct } from './IViewProduct';
import type { ICategory } from './ICategory';

export interface IApiGetProductResponse {
    title: string;
    categories: ICategory[];
    productList: IProductList;
}

export interface IProductList extends IViewProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}
