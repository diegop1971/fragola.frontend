<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { IApiGetProductsResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductsResponse'
import type { IViewProduct } from '@app/backoffice/products/domain/interfaces/IViewProduct'
import GetProductsListService from '@app/backoffice/products/application/find/GetProductsListService'
import DeleteProductService from '@app/backoffice/products/application/delete/DeleteProductService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'

const errorRedirectService = new ErrorRedirectService()

const products = ref()

let snackbar: Ref<boolean> = ref(false)

let snackbarMessage: Ref<string> = ref('')

onMounted(async () => {
  await getProductData()
})

const router = useRouter()

const getProductData = async (): Promise<void> => {
  try {
    const getProductsListService = new GetProductsListService()
    const response: IApiGetProductsResponse = await getProductsListService.getApiResponse()
    products.value = response.productList
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
  { key: 'name', title: 'Product', value: 'name' },
  { key: 'price', title: 'Price', value: 'price' },
  { key: 'category_name', title: 'Category', value: 'category_name' },
  { key: 'enabled', title: 'Enabled', value: 'enabled' },
  { key: 'low_stock_alert', title: 'Low stock alert', value: 'low_stock_alert' },
  { key: 'low_stock_threshold', title: 'Low stock threshold', value: 'low_stock_threshold' },
  { key: 'out_of_stock', title: 'Out of stock', value: 'out_of_stock' },
  { key: 'actions', title: 'Actions', align: 'center', value: 'actions' }
]

const createNewProduct = () => {
  router.push({ name: 'create-product' })
}

const editItem = (item: IViewProduct) => {
  router.push({ name: 'edit-product', params: { productId: item.id } })
}

const deleteItem = async (item: IViewProduct) => {
  try {
    const deleteProduct = new DeleteProductService()
    const deleteResponse = await deleteProduct.delete(item.id)
    snackbarMessage.value = deleteResponse.data.message

    const index = products.value.findIndex((product: IViewProduct) => product.id === item.id)
    if (index !== -1) {
      products.value.splice(index, 1)
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

              <v-toolbar-title>Products list</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <v-btn @click="createNewProduct">New Item</v-btn>
            </v-toolbar>
            <v-container fluid>
              <v-data-table :headers="headers" :items="products">
                <template v-slot:item.low_stock_alert="{ item }">
                  <td>{{ item.low_stock_alert ? 'yes' : 'no' }}</td>
                </template>
                <template v-slot:item.enabled="{ item }">
                  <td>{{ item.enabled ? 'yes' : 'no' }}</td>
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
