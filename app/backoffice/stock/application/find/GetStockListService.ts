import axios from 'axios'

import type { IApiGetStockListResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockListResponse'

class GetStockListService {
  private apiProductsResponse: IApiGetStockListResponse = {
    title: '',
    stockList: {
      id: '',
      product_id: '',
      movement_type_id: '',
      quantity: 0,
      date: '',
      notes: 'nota generica ...',
      enabled: false,
      created_at: '',
      updated_at: '',
      movement_type: '',
      product_name: ''
    }
  }

  constructor() {}

  public async getApiResponse(): Promise<IApiGetStockListResponse> {
    await this.getProductList()
    return this.apiProductsResponse
  }

  private async getProductList(): Promise<void> {
    const response = await axios.get<IApiGetStockListResponse>('http://localhost:8000/api/stock/')
    this.apiProductsResponse = response.data
  }
}

export default GetStockListService
