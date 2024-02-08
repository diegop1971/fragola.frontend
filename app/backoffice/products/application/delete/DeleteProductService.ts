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
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      await axios.delete(`http://localhost:8000/api/products/${item}`)
      console.log('try')
    } catch (error: any) {
      console.log('la puta que te pario')
    }
    return this.deleteResponse
  }
}

export default DeleteProductService
