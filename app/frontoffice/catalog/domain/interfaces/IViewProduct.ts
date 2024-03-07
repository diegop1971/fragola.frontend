import type { IBaseProduct } from '@app/frontoffice/catalog/domain/interfaces/IBaseProduct'

export interface IViewProduct extends IBaseProduct {
  description: string
  category_id: string
  total_quantity: number
}
