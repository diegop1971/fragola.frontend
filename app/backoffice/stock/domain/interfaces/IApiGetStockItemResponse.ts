import type { IApiStockErrorResponse } from '@app/backoffice/stock/domain/interfaces/IApiStockErrorResponse'
import type { IStockItem } from '@app/backoffice/stock/domain/interfaces/IStockItem'

interface IApiStockItemSuccessResponse {
  title: string
  stockItem: IStockItem
}

export type IApiGetStockItemResponse = IApiStockItemSuccessResponse | IApiStockErrorResponse
