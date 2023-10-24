import type { IProduct } from './IProduct';

export interface IApiResponse {
    title: string;
    metaDescription: string;
    homeProducts: ProductData[];
}

export interface ProductData extends IProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}
