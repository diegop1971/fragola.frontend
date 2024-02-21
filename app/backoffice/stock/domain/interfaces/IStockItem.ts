import type { IBaseStockItem } from '@app/backoffice/stock/domain/interfaces/IBaseStockItem'

export interface IStockItem extends IBaseStockItem {
  created_at: string
  updated_at: string
  movement_type: string
  product_name: string
}
