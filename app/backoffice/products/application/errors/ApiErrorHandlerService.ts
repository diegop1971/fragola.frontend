import type { IApiProductErrorResponse } from '@app/backoffice/products/domain/interfaces/IApiProductErrorResponse'

class ApiErrorHandlerService {
  handleError(error: any): IApiProductErrorResponse | void {
    if (error.response && error.response.data) {
      const errorResponse: IApiProductErrorResponse = {
        errors: {
          success: false,
          code: error.response.data.status,
          message: error.response.data.message,
          detail: {}
        }
      }
      return errorResponse
    }
  }
}
export default ApiErrorHandlerService
