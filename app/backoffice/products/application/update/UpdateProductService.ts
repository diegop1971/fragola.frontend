import axios from 'axios'

import type { IUpdateProductResponse } from '@app/backoffice/products/domain/interfaces/IUpdateProductResponse'

axios.defaults.withCredentials = true

class UpdateProductService {
  private id: string
  private name: string
  private price: number
  private description: string
  private description_short: string
  private selected_category: string
  private low_stock_threshold: number
  private low_stock_alert: number
  private out_of_stock: number
  private enabled: number

  constructor(
    id: string,
    name: string,
    price: number,
    description: string,
    description_short: string,
    selected_category: string,
    low_stock_threshold: number,
    low_stock_alert: number,
    out_of_stock: number,
    enabled: number
  ) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.description_short = description_short
    this.selected_category = selected_category
    this.low_stock_threshold = low_stock_threshold
    this.low_stock_alert = low_stock_alert
    this.out_of_stock = out_of_stock
    this.enabled = enabled
  }

  public update = async (): Promise<IUpdateProductResponse> => {
    await axios.get('/sanctum/csrf-cookie')
    const response: IUpdateProductResponse = await axios.put(
      '/api/products/update',
      {
        id: this.id,
        name: this.name,
        price: this.price,
        description: this.description,
        description_short: this.description_short,
        category_id: this.selected_category,
        low_stock_threshold: this.low_stock_threshold,
        low_stock_alert: this.low_stock_alert,
        out_of_stock: this.out_of_stock,
        enabled: this.enabled
      }
    )
    return response
  }
}
export default UpdateProductService
