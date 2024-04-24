import axios from 'axios'

import type { IApiGetOrdersResponse } from '@app/backoffice/orders/domain/interfaces/IApiGetOrdersResponse'

class GetOrdersService {

  constructor() {}

  public async getOrders(): Promise<IApiGetOrdersResponse> {
    const response = await axios.get<IApiGetOrdersResponse>('/api/orders-list/')
    return response.data
  }
}

export default GetOrdersService