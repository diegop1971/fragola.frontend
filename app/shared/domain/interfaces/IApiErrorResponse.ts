export interface IApiErrorResponse {
  errors: {
    success: boolean
    code: number
    message: string
    detail: {
      [key: string]: string[]
    }
  }
}
