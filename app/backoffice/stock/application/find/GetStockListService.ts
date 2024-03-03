import axios from 'axios'

import type { IApiGetStockListSuccessResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockListSuccessResponse'

class GetStockListService {
  private apiGetStockListResponse: IApiGetStockListSuccessResponse = {
    title: '',
    stockItem: [
      {
        id: '',
        product_id: '',
        movement_type_id: '',
        quantity: 0,
        date: '',
        notes: '',
        enabled: 0,
        created_at: '',
        updated_at: '',
        movement_type: '',
        product_name: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IApiGetStockListSuccessResponse> {
    await this.getProductList()
    return this.apiGetStockListResponse
  }

  private async getProductList(): Promise<void> {
    const response = await axios.get<IApiGetStockListSuccessResponse>('http://localhost:8000/api/stock/')
    this.apiGetStockListResponse = response.data
  }
}

export default GetStockListService
