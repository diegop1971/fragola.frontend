import axios from 'axios'

import type { ICategoriesResponse } from '@app/backoffice/products/domain/interfaces/ICategoriesResponse'

class GetCategoriesService {
  private apiCategorieResponse: ICategoriesResponse = {
    title: '',
    categoriesList: [
      {
        id: 0,
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
    try {
      const response = await axios.get<ICategoriesResponse>(`http://localhost:8000/api/categories`)
      this.apiCategorieResponse = response.data
    } catch (error) {
      console.error('Error fetching categories list:', error)
      throw error
    }
  }
}

export default GetCategoriesService
