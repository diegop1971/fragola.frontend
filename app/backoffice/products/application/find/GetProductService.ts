import axios from 'axios'

import type { IApiGetProductResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductResponse'

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

  public async getApiResponse(id: string[] | string): Promise<IApiGetProductResponse> {
    await this.getProductList(id)

    return this.apiProductResponse
  }

  private async getProductList(id: string[] | string): Promise<void> {
    const response = await axios.get<IApiGetProductResponse>(
      `http://localhost:8000/api/products/${id}/edit`
    )
    this.apiProductResponse = response.data
  }
}

export default GetProductService
