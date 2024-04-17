import axios from 'axios'

import type { IApiGetProductsResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductsResponse'

class GetProductListService {
  private apiProductsResponse: IApiGetProductsResponse = {
    title: '',
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

  public async getApiResponse(): Promise<IApiGetProductsResponse> {
    await this.getProductList()
    return this.apiProductsResponse
  }

  private async getProductList(): Promise<void> {
    const response = await axios.get<IApiGetProductsResponse>('/api/products/')
    this.apiProductsResponse = response.data
  }
}

export default GetProductListService