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

            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ErrorHandlingService from '@app/shared/application/ErrorHandlingService'
import type { IApiGetProductsResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductsResponse'
import type { IViewProduct } from '@app/backoffice/products/domain/interfaces/IViewProduct'
import GetProductsListService from '@app/backoffice/products/application/find/GetProductsListService'

const errorHandling = new ErrorHandlingService()

const products = ref()

onMounted(async () => {
  try {
    await getProductData()
  } catch (error: any) {
    errorHandling.handleApiError(error)
  }
})

const router = useRouter()

const getProductData = async (): Promise<void> => {
  try {
    const getProductsListService = new GetProductsListService()
    const response: IApiGetProductsResponse = await getProductsListService.getApiResponse()
    products.value = response.productList
  } catch (error) {
    console.log(error)
  }
}

const headers = [
  { title: 'Product', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Category', key: 'category_name' },
  { title: 'Minimun Quantity', key: 'minimum_quantity' },
  { title: 'Low stock threshold', key: 'low_stock_threshold' },
  { title: 'Low stock alert', key: 'low_stock_alert' },
  { title: 'Enabled', key: 'enabled' },
  { title: 'Actions', key: 'actions', align: 'center' }
]

const createNewProduct = () => {
  router.push({ name: 'create-product' })
  console.log('Crear un nuevo ítem')
}

const editItem = (item: IViewProduct) => {
  router.push({ name: 'edit-product', params: { productId: item.id } })
}

const deleteItem = (item: string) => {
  router.push({ name: 'delete-product' })
  console.log('Eliminar:', item)
}
</script>
