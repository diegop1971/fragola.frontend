import axios from 'axios'

import type { IStockMovementTypesResponse } from '@app/backoffice/stock/domain/interfaces/IStockMovementTypesResponse'

class GetStockMovementTypesService {
  private apiCategorieResponse: IStockMovementTypesResponse = {
    title: '',
    stockMovementTypesList: [
      {
        id: '',
        name: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IStockMovementTypesResponse> {
    await this.getCategoriesList()
    return this.apiCategorieResponse
  }

  private async getCategoriesList(): Promise<void> {
    const response = await axios.get<IStockMovementTypesResponse>(`http://localhost:8000/api/stock-movement-types`)
    this.apiCategorieResponse = response.data
  }
}

export default GetStockMovementTypesService
