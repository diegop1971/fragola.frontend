import type { IPaymentMethod } from "@app/frontoffice/checkout/domain/interfaces/IPaymentMethod"

export interface IPaymentMethodsResponse {
  title: string
  paymentMethodsList: IPaymentMethod[]
}
