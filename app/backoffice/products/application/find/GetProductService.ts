import axios from 'axios'

import type { IApiGetProductResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductResponse'

class GetProductService {
  private apiProductResponse: IApiGetProductResponse = {
    title: '',
    categories: [],
    productList: {
      id: '',
      category_id: '',
      category_name: '',
      name: '',
      description: '',
      description_short: '',
      price: 0,
      low_stock_threshold: 0,
      low_stock_alert: 0,
      out_of_stock: 0,
      enabled: 0,
      created_at: '',
      updated_at: ''
    }
  }

  constructor() {}

  public async getApiResponse(id: string[] | string): Promise<IApiGetProductResponse> {
    const response = await axios.get<IApiGetProductResponse>(
      `/api/products/${id}/edit`
    )
    this.apiProductResponse = response.data
    return this.apiProductResponse
  }
}

export default GetProductService
