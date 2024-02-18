import axios from 'axios'

import type { IStockMovementTypesResponse } from '@app/backoffice/stock/domain/interfaces/IStockMovementTypesResponse'

class GetStockMovementTypesService {
  
  private apiStockMovementTypesResponse: IStockMovementTypesResponse = {
    title: '',
    stockMovementTypes: [
      {
        id: '',
        movement_type: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IStockMovementTypesResponse> {
    await this.getStockMovementTypes()
    return this.apiStockMovementTypesResponse
  }

  private async getStockMovementTypes(): Promise<void> {
    const response = await axios.get<IStockMovementTypesResponse>(`http://localhost:8000/api/stock-movement-types/limited-fields-list`)
    this.apiStockMovementTypesResponse = response.data
  }
}

export default GetStockMovementTypesService
