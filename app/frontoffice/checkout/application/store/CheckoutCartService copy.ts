import axios from 'axios'

import type { ICheckoutCartResponse } from '@app/frontoffice/checkout/domain/interfaces/ICheckoutCartResponse'

axios.defaults.withCredentials = true

class CheckoutCartService {
  private paymentMethodName: string

  constructor(
    idPaymentMethod: string,
  ) {
    this.paymentMethodName = idPaymentMethod
  }

  public store = async (): Promise<ICheckoutCartResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    const response: ICheckoutCartResponse = await axios.post(
      'http://localhost:8000/api/checkout-cart/store',
      {
        customerId: '7aa88d43-424c-4d9e-aa75-7923d7ea0821',
        paymentMethodName: this.paymentMethodName,
      }
    )
    return response
  }
}
export default CheckoutCartService
