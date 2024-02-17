import type { IStockMovementType } from "@app/backoffice/stock/domain/interfaces/IStockMovementType"

export interface IStockMovementTypesResponse {
  title: string
  stockMovementTypes: IStockMovementType[]
}
