import axios from 'axios'

import type { IApiGetProductResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetProductResponse'

class GetProductsService {
  private apiProductResponse: IApiGetProductResponse = {
    products: [
      {
        id: '',
        name: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IApiGetProductResponse> {
    const response = await axios.get<IApiGetProductResponse>(
      `/api/products/product-list`
    )
    this.apiProductResponse = response.data
    return this.apiProductResponse
  }
}

export default GetProductsService
