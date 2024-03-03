import axios from 'axios'

import type { IStoreStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IStoreStockItemResponse'

axios.defaults.withCredentials = true

class StoreStockItemService {
  private product_id: string
  private movement_type_id: string
  private quantity: number
  private date: Date | string
  private notes: string
  private enabled: number

  constructor(
    product_id: string,
    movement_type_id: string,
    quantity: number,
    date: Date | string,
    notes: string,
    enabled: number
  ) {
    this.product_id = product_id
    this.movement_type_id = movement_type_id
    this.quantity = quantity
    this.date = date
    this.notes = notes
    this.enabled = enabled
  }

  public store = async (): Promise<IStoreStockItemResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    const response: IStoreStockItemResponse = await axios.post(
      'http://localhost:8000/api/stock-movement/store',
      {
        product_id: this.product_id,
        movement_type_id: this.movement_type_id,
        quantity: this.quantity,
        date: this.date,
        notes: this.notes,
        enabled: this.enabled
      }
    )
    return response
  }
}
export default StoreStockItemService
