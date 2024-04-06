import axios from 'axios'

import type { ICheckoutCartResponse } from '@app/frontoffice/checkout/domain/interfaces/ICheckoutCartResponse'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'

axios.defaults.withCredentials = true

class CheckoutCartService {
  private customerEmail: string
  private firstName: string
  private lastName: string
  private paymentMethodId: string
  private cartData: ISessionCartItemResponse

  constructor(
    customerEmail: string,
    firstName: string,
    lastName: string,
    paymentMethodId: string,
    cartData: ISessionCartItemResponse,
  ) {
    this.customerEmail = customerEmail
    this.firstName = firstName
    this.lastName = lastName
    this.paymentMethodId = paymentMethodId
    this.cartData = cartData
  }

  public store = async (): Promise<ICheckoutCartResponse> => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    const response: ICheckoutCartResponse = await axios.post(
      'http://localhost:8000/api/checkout-cart/store',
      {
        customerId: '40cdbdb0-c5f5-4d0e-b72f-18c63cdb439e',
        customerEmail: this.customerEmail,
        firstName: this.firstName,
        lastName: this.lastName,
        paymentMethodId: this.paymentMethodId,
        cartData: this.cartData,
      }
    )
    return response
  }
}
export default CheckoutCartService
