export interface IApiStockErrorResponse {
  errors: {
    success: boolean
    code: number
    message: string
    detail: {
      [key: string]: string[]
    }
  }
}
