import type { IProduct } from './IProduct';
import type { ICategory } from './ICategory';

export interface IApiGetProductResponse {
    title: string;
    categories: ICategory;
    productList: IProductList;
}

export interface IProductList extends IProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}
