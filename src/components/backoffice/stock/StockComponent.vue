<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { IStockItem } from '@app/backoffice/stock/domain/interfaces/IStockItem'
import GetStockListGroupedByProductIdService from '@app/backoffice/stock/application/find/GetStockListGroupedByProductIdService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'

const errorRedirectService = new ErrorRedirectService()
const stockList = ref()
const pageTitle = ref()
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

const router = useRouter()

onMounted(async () => {
  await getStockData()
})

const getStockData = async (): Promise<void> => {
  try {
    const getStockListService = new GetStockListGroupedByProductIdService()
    const response = await getStockListService.getApiResponse()
    stockList.value = response.stockItem
    pageTitle.value = `${response.pageTitle}`
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
  { title: 'Product', key: 'product_name' , value:'product_name'},
  { title: 'Physical Quantity', key: 'physical_quantity', value:'physical_quantity' },
  { title: 'Usable Quantity', key: 'usable_quantity' , value:'usable_quantity'},
  { title: 'Low stock threshold', key: 'low_stock_threshold', value:'low_stock_threshold' },
  { title: 'Low stock alert', key: 'low_stock_alert', value:'low_stock_alert' },
  { title: 'Out of stock', key: 'out_of_stock', value:'out_of_stock' },
  { title: 'Product enabled', key: 'enabled', value:'enabled' },
  { title: 'Actions', key: 'actions', align: 'center', value:'center' }
]

const viewItem = (item: IStockItem) => {
  router.push({ name: 'stock-by-product-id', params: { productId: item.id } })
}

const addItem = (item?: IStockItem) => {
  if (item) {
    router.push({ name: 'create-stock-item', params: { productId: item.id } });
  } else {
    router.push({ name: 'create-stock-item' });
  }
}

const goBack = () => {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <v-main class="d-flex justify-center">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="grey-lighten-4" flat height="1000px" rounded="0">
            <v-toolbar border density="compact" flat>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-btn @click="addItem()">
                <v-icon left>mdi-plus</v-icon>
                Add item
              </v-btn>
              <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn small @click="goBack()" class="align-self-center">
                <v-icon>mdi-arrow-left</v-icon>
                Dashboard
              </v-btn>
            </v-toolbar>
            <v-container fluid>
              <v-data-table :headers="headers" :items="stockList">
                <template v-slot:item.enabled="{ item }">
                  <td>{{ item.enabled ? 'yes' : 'no' }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                  <td>
                    <v-icon small @click="viewItem(item)">mdi-eye-outline</v-icon>
                    <v-icon small @click="addItem(item)">mdi-plus-circle-outline</v-icon>
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
