export interface IBaseStockItem {
  id: string
  product_id: string
  movement_type_id: string
  date: Date | string
  notes: string
  enabled: number
}
