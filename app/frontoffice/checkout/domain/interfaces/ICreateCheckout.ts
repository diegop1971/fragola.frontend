export interface ICreateCheckout {
  customer_id: string
  customer_email: string
  payment_method_id: string
  order_status_id: string
  total_paid: number
  payment_method_name: string
}
