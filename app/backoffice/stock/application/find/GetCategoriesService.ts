import axios from 'axios'

import type { ICategoriesResponse } from '@app/backoffice/stock/domain/interfaces/ICategoriesResponse'

class GetCategoriesService {
  private apiCategorieResponse: ICategoriesResponse = {
    title: '',
    categoriesList: [
      {
        id: '',
        name: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<ICategoriesResponse> {
    await this.getCategoriesList()
    return this.apiCategorieResponse
  }

  private async getCategoriesList(): Promise<void> {
    const response = await axios.get<ICategoriesResponse>(`http://localhost:8000/api/categories`)
    this.apiCategorieResponse = response.data
  }
}

export default GetCategoriesService
