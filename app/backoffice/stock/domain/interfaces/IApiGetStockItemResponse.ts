import type { IStockItem } from '@app/backoffice/stock/domain/interfaces/IStockItem'
import type { ICategory } from '@app/backoffice/stock/domain/interfaces/ICategory'

export interface IApiGetStockItemResponse {
  pageTitle: string
  categories: ICategory[]
  stockItem: IStockItem[]
}
