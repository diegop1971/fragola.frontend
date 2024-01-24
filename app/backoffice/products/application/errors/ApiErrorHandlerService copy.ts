import type { IUpdateProductResponse } from '@app/backoffice/products/domain/interfaces/IUpdateProductResponse'

class ApiErrorHandlerService {
  handleError(error: any): IUpdateProductResponse | void{
    if (error.response && error.response.data) {
      console.log(error.response)
      const errorResponse: IUpdateProductResponse = {
        data: {
          success: false,
          message: error.response.data.message,
          status: error.response.data.status
        }
      }
      return errorResponse
    }
  }
}
export default ApiErrorHandlerService
