export interface IApiGetOrdersResponse {
  title: string,
  orders: {
    itemsQuantity: number
    totalPaid: number
    createdAt: string
  },
  ordersStatus: {
    id: string
    name: string,
    idOrderStatus: string,
    description: string,
  }
}
