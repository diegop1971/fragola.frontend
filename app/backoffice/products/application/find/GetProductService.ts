import axios from 'axios'

import type { IApiGetProductResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductResponse'
import type { IApiErrorResponse } from '@app/shared/domain/interfaces/IApiErrorResponse'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'

class GetProductService {
  private apiProductResponse: IApiGetProductResponse = {
    title: '',
    categories: [],
    productList: {
      id: '',
      category_id: 0,
      category_name: '',
      name: '',
      description: '',
      description_short: '',
      price: 0,
      minimum_quantity: 0,
      low_stock_threshold: 0,
      low_stock_alert: 0,
      enabled: 0,
      created_at: '',
      updated_at: ''
    }
  }

  constructor() {}

  public async getApiResponse(id: string[] | string): Promise<IApiGetProductResponse | IApiErrorResponse> {
    try {
      await this.getProductList(id)
      return this.apiProductResponse
    } catch (error: any) {
      console.error('peperoni:', error.status)
      const apiErrorHandler = new ApiErrorHandler()
      const errorResponse: IApiErrorResponse = apiErrorHandler.handleError(error)
      return errorResponse
    }
  }

  private async getProductList(id: string[] | string): Promise<void> {
    const response = await axios.get<IApiGetProductResponse>(
      `http://localhost:8000/api/products/${id}/edit`
    )
    this.apiProductResponse = response.data
  }
}

export default GetProductService
