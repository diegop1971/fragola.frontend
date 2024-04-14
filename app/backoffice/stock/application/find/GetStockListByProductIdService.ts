import axios from 'axios'

import type { IApiGetStockListByProductIdSuccessResponse } from '@app/backoffice/stock/domain/interfaces/IApiGetStockListByProductIdSuccessResponse'

class GetStockListByProductIdService {

  constructor() {}

  public async getApiResponse(id: string[] | string): Promise<IApiGetStockListByProductIdSuccessResponse> 
  {
    const response = await axios.get<IApiGetStockListByProductIdSuccessResponse>(
      `http://localhost:8000/api/stock-movement/stocklistByProductId/${id}`
    )

    return response.data
  }
}

export default GetStockListByProductIdService
