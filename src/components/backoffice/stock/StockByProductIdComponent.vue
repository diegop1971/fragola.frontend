<template>
  <v-main class="d-flex justify-center">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="grey-lighten-4" flat height="1000px" rounded="0">
            <v-toolbar border density="compact">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>{{ pageTitle }} </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <v-btn @click="goBack">
                <v-icon left>mdi-arrow-left</v-icon>
                Go back
              </v-btn>
            </v-toolbar>
            <v-container fluid>
              <v-data-table :headers="headers" :items="stockList">
                <template v-slot:item.enabled="{ item }">
                  <td>{{ item.enabled ? 'yes' : 'no' }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                  <td>
                    <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
                  </td>
                </template>
              </v-data-table>
              <v-btn @click="createNewProduct">New Item</v-btn>
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

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import type { IStockItem } from '@app/backoffice/stock/domain/interfaces/IStockItem'
import GetStockListByProductIdService from '@app/backoffice/stock/application/find/GetStockListByProductIdService'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
const router = useRouter()
const route = useRoute()
const errorRedirectService = new ErrorRedirectService()
const stockList = ref()
const pageTitle = ref()
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

const productId: string[] | string = route.params.productId

const headers = [
  { title: 'Created at', key: 'created_at' },
  { title: 'Product', key: 'product_name' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Enabled', key: 'enabled' },
  { title: 'Actions', key: 'actions', align: 'center' }
]

onMounted(async () => {
  await getStockData(productId)
})

const getStockData = async (productId: string[] | string): Promise<void> => {
  try {
    const getStockListService = new GetStockListByProductIdService()
    const response = await getStockListService.getApiResponse(productId)
    stockList.value = response.stockItem
    pageTitle.value = `${response.pageTitle}: ${stockList.value[0].product_name}`; 
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

const createNewProduct = () => {
  router.push({ name: 'create-product' })
}

const editItem = (item: IStockItem) => {
  //router.push({ name: 'edit', params: { stockId: item.id } })
  //router.push({ name: 'stock-by-product-id', params: { productId: item.id } })
}

const goBack = () => {
  router.push({ name: 'stock' })
}
</script>
