import axios from 'axios'

import type { IApiGetStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockItemResponse'

class GetStockItemService {
  private getStockItemResponse: IApiGetStockItemResponse = {
    pageTitle: '',
    categories: [
      {
        id: '',
        name: '',
      }
    ],
    stockItem: [
      {
        id: '',
        product_id: '',
        movement_type_id: '',
        date: '',
        notes: '',
        enabled: 0,
        created_at: '',
        updated_at: '',
        movement_type: '',
        product_name: '',
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IApiGetStockItemResponse> {
    const response = await axios.get<IApiGetStockItemResponse>(
      `http://localhost:8000/api/stock/create`
    )
    this.getStockItemResponse = response.data
    return this.getStockItemResponse
  }
}

export default GetStockItemService
