export interface IApiProductErrorResponse {
  errors: {
    success: boolean
    code: number
    message: string
    detail: {
      [key: string]: string[]
    }
  }
}
