import type { IViewProduct } from './IViewProduct'
import type { ICategory } from './ICategory'
//import type { IApiErrorResponse } from '@app/shared/domain/interfaces/IApiErrorResponse'

export interface IApiGetProductResponse {
  title: string
  categories: ICategory[]
  productList: IProductList
  //apiErrorResponse?: IProductErrorResponse
}

export interface IProductList extends IViewProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}

//export interface IProductErrorResponse extends IApiErrorResponse {}
