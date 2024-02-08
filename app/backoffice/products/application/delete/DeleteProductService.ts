import axios from 'axios'

import type { IDeleteProductResponse } from '@app/backoffice/products/domain/interfaces/IDeleteProductResponse'

class DeleteProductService {
  private deleteResponse: IDeleteProductResponse = {
    data: {
      success: false,
      message: ''
    },
    code: 0
  }

  public delete = async (item: string): Promise<IDeleteProductResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    
    this.deleteResponse = await axios.delete(`http://localhost:8000/api/products/${item}`)

    return this.deleteResponse
  }
}

export default DeleteProductService
