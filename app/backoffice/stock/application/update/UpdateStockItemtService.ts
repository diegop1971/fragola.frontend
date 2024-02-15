import axios from 'axios'

import type { IUpdateStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IUpdateStockItemResponse'

axios.defaults.withCredentials = true

class UpdateStockItemService {
  private id: string
  private product_id: string
  private movement_type_id: string
  private quantity: number
  private date: string
  private notes: string
  private enabled: false
  private created_at: string
  private updated_at: string
  private movement_type: string
  private product_name: string

  constructor(
    id: string,
    product_id: string,
    movement_type_id: string,
    quantity: number,
    date: string,
    notes: string,
    enabled: false,
    created_at: string,
    updated_at: string,
    movement_type: string,
    product_name: string
  ) {
    this.id = id
    this.product_id = product_id
    this.movement_type_id = movement_type_id
    this.quantity = quantity
    this.date = date
    this.notes = notes
    this.enabled = enabled
    this.created_at = created_at
    this.updated_at = updated_at
    this.movement_type = movement_type
    this.product_name = product_name
  }

  public update = async (): Promise<IUpdateStockItemResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    const response: IUpdateStockItemResponse = await axios.put(
      'http://localhost:8000/api/stock/update',
      {
        id: this.id,
        product_id: this.product_id,
        movement_type_id: this.movement_type_id,
        quantity: this.quantity,
        date: this.date,
        notes: this.notes,
        enabled: this.enabled,
        created_at: this.created_at,
        updated_at: this.updated_at,
        movement_type: this.movement_type,
        product_name: this.product_name
      }
    )
    return response
  }
}
export default UpdateStockItemService
