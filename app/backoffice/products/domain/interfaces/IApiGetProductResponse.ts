import type { IViewProduct } from './IViewProduct'
import type { ICategory } from './ICategory'
import type { IApiProductErrorResponse } from './IApiProductErrorResponse'

interface IApiProductSuccessResponse  {
  title: string
  categories: ICategory[]
  productList: IProductList
}

export type IApiGetProductResponse = IApiProductSuccessResponse | IApiProductErrorResponse;

export interface IProductList extends IViewProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}

