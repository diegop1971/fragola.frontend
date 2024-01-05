import axios from 'axios'

axios.defaults.withCredentials = true

interface IUpdateProductResponse {
  success: boolean;
  message: string;
}

class UpdateProductService {

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

  public update = async (): Promise<IUpdateProductResponse | undefined> => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      const response: IUpdateProductResponse = await axios.put('http://localhost:8000/api/products/update', {
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
      })
      return response 
    } catch (error: any) {
      if (error.response && error.response.data) {
        const jsonData: IUpdateProductResponse = error.response.data
        return jsonData;
      } else {
        console.error('No se pudo acceder al JSON en error.response.data')
        throw error;
      }
    } 
  }
}
export default UpdateProductService
