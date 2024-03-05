import type { IViewProduct } from '@app/frontoffice/catalog/domain/interfaces/IViewProduct';

export interface IApiProductCardsResponse {
    title: string;
    metaDescription: string;
    homeProducts: ProductData[];
}

export interface ProductData extends IViewProduct {
  // agregar propiedades específicas de ProductData, si las hay.
}
