import type { IBaseProduct } from '@app/backoffice/products/domain/interfaces/IBaseProduct'

export interface IProductView extends IBaseProduct {
  category_name: string
  created_at: string
  updated_at: string
}
