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
        customerId: '40cdbdb0-c5f5-4d0e-b72f-18c63cdb439e',
        paymentMethodId: this.paymentMethodId,
        cartData: this.cartData,
      }
    )
    return response
  }
}
export default CheckoutCartService
