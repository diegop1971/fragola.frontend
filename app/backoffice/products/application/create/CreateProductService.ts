import axios from 'axios'

import type { ICreateProductResponse } from '@app/backoffice/products/domain/interfaces/ICreateProductResponse'

axios.defaults.withCredentials = true

class CreateProductService {
  private id: string
  private name: string
  private price: number
  private description: string
  private description_short: string
  private selected_category: number
  private minimum_quantity: number
  private low_stock_threshold: number
  private low_stock_alert: number
  private enabled: number

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    description_short: string,
    selected_category: number,
    minimum_quantity: number,
    low_stock_threshold: number,
    low_stock_alert: number,
    enabled: number
  ) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.description_short = description_short
    this.selected_category = selected_category
    this.minimum_quantity = minimum_quantity
    this.low_stock_threshold = low_stock_threshold
    this.low_stock_alert = low_stock_alert
    this.enabled = enabled
  }

  public store = async (): Promise<ICreateProductResponse> => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      const response: ICreateProductResponse = await axios.post(
        'http://localhost:8000/api/products/store',
        {
          id: this.id,
          name: this.name,
          price: this.price,
          description: this.description,
          description_short: this.description_short,
          category_id: this.selected_category,
          minimum_quantity: this.minimum_quantity,
          low_stock_threshold: this.low_stock_threshold,
          low_stock_alert: this.low_stock_alert,
          enabled: this.enabled
        }
      )
      return response
    } catch (error: any) {
      if (error.response && error.response.data) {
        const jsonData: ICreateProductResponse = error.response.data
        return jsonData
      } else {
        const errorResponse: ICreateProductResponse = {
          data: {
            success: false,
            message: 'No se pudo acceder al servidor'
          },
          status: 503
        }
        return errorResponse
      }
    }
  }
}
export default CreateProductService
