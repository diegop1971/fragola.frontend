import axios from 'axios'

import type { IPaymentMethodsResponse } from '@app/frontoffice/checkout/domain/interfaces/IPaymentMethodsResponse'

class GetPaymentMethodsService {
  private apiPaymentMethodsResponse: IPaymentMethodsResponse = {
    title: '',
    paymentMethodsList: [
      {
        id: '',
        name: ''
      }
    ]
  }

  constructor() {}

  public async getApiResponse(): Promise<IPaymentMethodsResponse> {
    await this.getPaymentMethodsList()
    return this.apiPaymentMethodsResponse
  }

  private async getPaymentMethodsList(): Promise<void> {
    const response = await axios.get<IPaymentMethodsResponse>(`http://localhost:8000/api/payment-methods`)
    this.apiPaymentMethodsResponse = response.data
  }
}

export default GetPaymentMethodsService
