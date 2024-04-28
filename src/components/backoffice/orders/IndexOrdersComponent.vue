<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { IApiGetOrdersResponse } from '@app/backoffice/orders/domain/interfaces/IApiGetOrdersResponse'
import GetOrdersService from '@app/backoffice/orders/application/find/GetOrdersService'

import type { IViewProduct } from '@app/backoffice/products/domain/interfaces/IViewProduct'
import DeleteProductService from '@app/backoffice/products/application/delete/DeleteProductService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import type { IOrderStatus } from '@app/backoffice/orders/domain/interfaces/IOrderStatus'

const errorRedirectService = new ErrorRedirectService()

const orders = ref()
const orderStatuses = ref()
const orderStatusNamesWithIds = ref<IOrderStatus[]>([])
const selectedOrderStatus = ref<string>('')

let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

onMounted(async () => {
  await getOrders()
})

const router = useRouter()

const getOrders = async (): Promise<void> => {
  try {
    const getOrdersService = new GetOrdersService()
    const response: IApiGetOrdersResponse = await getOrdersService.getOrders()
    orders.value = response.orders

    if ('orders' in response && 'ordersStatus' in response) {
      orderStatuses.value = response.ordersStatus

      orderStatusNamesWithIds.value = orderStatuses.value.map((orderStatus: IOrderStatus) => ({
        id: orderStatus.id,
        name: orderStatus.name,
        idOrderStatus: orderStatus,
        description: orderStatus.description
      }))
    }
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
      snackbarMessage.value = error.response.data.message
      snackbar.value = true
    }
  }
}

interface Header {
  key: string
  title: string
  value: string
  align?: 'start' | 'end' | 'center'
}

const headers: Header[] = [
  { key: 'first_name', title: 'Name', value: 'first_name' },
  { key: 'items_quantity', title: 'Items Quantity', value: 'items_quantity' },
  { key: 'total_paid', title: 'Total Paid', value: 'total_paid' },
  { key: 'payment_method_name', title: 'Payment method', value: 'payment_method_name' },
  { key: 'order_status_name', title: 'Status', value: 'order_status_name' },
  { key: 'created_at', title: 'Created at', value: 'created_at' },
  { key: 'actions', title: 'Actions', align: 'center', value: 'actions' }
]

const createNewProduct = () => {
  router.push({ name: 'create-product' })
}

const editItem = (item: IViewProduct) => {
  router.push({ name: 'edit-product', params: { productId: item.id } })
}

const onOrderStatusChange = (newSelectedOrderStatus: string) => {
  console.log(newSelectedOrderStatus)
  selectedOrderStatus.value = newSelectedOrderStatus
}

const deleteItem = async (item: IViewProduct) => {
  try {
    const deleteProduct = new DeleteProductService()
    const deleteResponse = await deleteProduct.delete(item.id)
    snackbarMessage.value = deleteResponse.data.message

    const index = orders.value.findIndex((product: IViewProduct) => product.id === item.id)
    if (index !== -1) {
      orders.value.splice(index, 1)
    }
    snackbar.value = true
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
      snackbarMessage.value = error.response.data.message
      snackbar.value = true
    }
  }
}
</script>

<template>
  <v-main class="d-flex justify-center">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="grey-lighten-4" flat height="1000px" rounded="0">
            <v-toolbar border density="compact">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Orders</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <v-btn @click="createNewProduct">New Item</v-btn>
            </v-toolbar>
            <v-container fluid>
              <v-data-table :headers="headers" :items="orders">
                <template v-slot:item.order_status_name="{ item }">
                  <v-select
                    v-model="item.order_status_name"
                    :items="orderStatusNamesWithIds"
                    item-value="id"
                    item-title="name"
                    @update:modelValue="onOrderStatusChange"
                    label="Select"
                  ></v-select>
                </template>

                <template v-slot:item.actions="{ item }">
                  <td>
                    <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </td>
                </template>
              </v-data-table>
              <v-snackbar v-model="snackbar" multi-line>
                {{ snackbarMessage }}
                <template v-slot:actions>
                  <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
                </template>
              </v-snackbar>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
