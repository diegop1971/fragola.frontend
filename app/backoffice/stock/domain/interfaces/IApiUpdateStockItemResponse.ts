export interface IApiUpdateStockItemResponse {
  data: {
    success: boolean
    message: string
    errors?: {
      [key: string]: string[]
    }
    status: number
  }
}
