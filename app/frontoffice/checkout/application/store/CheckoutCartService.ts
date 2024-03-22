import axios from 'axios'

import type { ICheckoutCartResponse } from '@app/frontoffice/checkout/domain/interfaces/ICheckoutCartResponse'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'

axios.defaults.withCredentials = true

class CheckoutCartService {
  private paymentMethodId: string
  private cartData: ISessionCartItemResponse

  constructor(
    paymentMethodId: string,
    cartData: ISessionCartItemResponse,
  ) {
    this.paymentMethodId = paymentMethodId
    this.cartData = cartData
  }

  public store = async (): Promise<ICheckoutCartResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    const response: ICheckoutCartResponse = await axios.post(
      'http://localhost:8000/api/checkout-cart/store',
      {
        customerId: '7aa88d43-424c-4d9e-aa75-7923d7ea0821',
        paymentMethodId: this.paymentMethodId,
        cartData: this.cartData,
      }
    )
    return response
  }
}
export default CheckoutCartService
