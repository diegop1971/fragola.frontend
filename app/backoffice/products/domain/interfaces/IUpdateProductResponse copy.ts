export interface IUpdateProductResponse {
  data: {
    success: boolean
    message: string
    errors?: {
      [key: string]: string[]
    }
    status: number
  }
}
