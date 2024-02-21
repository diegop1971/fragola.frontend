export interface IBaseStockItem {
  id: string
  product_id: string
  movement_type_id: string
  quantity: number
  date: Date | string
  notes: string
  enabled: number
}
