import axios from 'axios'

import type { IApiGetStockListGroupedByProductIdSuccessResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockListGroupedByProductIdSuccessResponse'

class GetStockListGroupedByProductIdService {
  private apiGetStockListResponse: IApiGetStockListGroupedByProductIdSuccessResponse = {
    pageTitle: '',
    stockItem: [
      {
        items: 0,
        id: '',
        name: '',
        quantity: 0,
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IApiGetStockListGroupedByProductIdSuccessResponse> {
    await this.getProductList()
    return this.apiGetStockListResponse
  }

  private async getProductList(): Promise<void> {
    const response = await axios.get<IApiGetStockListGroupedByProductIdSuccessResponse>('/api/stock/')
    this.apiGetStockListResponse = response.data
  }
}

export default GetStockListGroupedByProductIdService
