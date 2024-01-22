import type { IUpdateProductResponse } from '@app/backoffice/products/domain/interfaces/IUpdateProductResponse'

class ApiErrorHandlerService {
  handleError(error: any): IUpdateProductResponse {
    
    if (error.response && error.response.data) {
      const errorResponse: IUpdateProductResponse = {
        data: {
          success: false,
          message: error.response.data.message,
          status: error.response.data.status
        }
      }
      return errorResponse
    } else {
      const errorResponse: IUpdateProductResponse = {
        data: {
          success: false,
          message: 'No se pudo establecer comunicacion con el servidor',
          status: 503
        }
      }
      return errorResponse
    }
  }
}
export default ApiErrorHandlerService
