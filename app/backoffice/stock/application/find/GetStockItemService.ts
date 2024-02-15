import axios from 'axios'

import type { IApiGetStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockItemResponse'

class GetStockItemService {
  private getStockItemResponse: IApiGetStockItemResponse = {
    title: '',
    stockItem: {
      id: '',
      product_id: '',
      movement_type_id: '',
      quantity: 0,
      date: '',
      notes: '',
      enabled: false,
      created_at: '',
      updated_at: '',
      movement_type: '',
      product_name: '',
    }
  }

  constructor() {}

  public async getApiResponse(id: string[] | string): Promise<IApiGetStockItemResponse> {
    const response = await axios.get<IApiGetStockItemResponse>(
      `http://localhost:8000/api/stock/${id}/edit`
    )
    this.getStockItemResponse = response.data
    return this.getStockItemResponse
  }
}

export default GetStockItemService
