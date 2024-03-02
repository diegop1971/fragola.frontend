export interface IApiGetStockListByProductIdSuccessResponse {
  pageTitle: string
  product: {
    category_id: string
    description: string
    description_short: string
    enabled: number
    id: string
    low_stock_alert: number
    low_stock_threshold: number
    name: string
    price: number
  }
  stockMovements: [
    {
      id: string
      product_id: string
      name: string
      quantity: number
    }
  ]
}
