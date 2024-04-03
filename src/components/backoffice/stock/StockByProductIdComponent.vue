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
                Stock list
              </v-btn>
            </v-toolbar>
            <v-card>
              <v-card-title class="primary darken-2 white--text">
                <v-icon>mdi-information-outline</v-icon>
                <span class="ml-2">Stock Summary</span>
              </v-card-title>
              <v-card-text>
                <p class="mb-2">
                  Product name: <strong>{{ productName }}</strong>
                </p>
                <p class="mb-2">Physical quantity: <strong> {{ stockAvailable }} </strong></p>
                <p class="mb-2">Low stock threshold: <strong> {{ lowStockThreshold }} </strong></p>
                <p v-if="stockAvailable > lowStockThreshold" class="green--text">Product available!</p>
                <p v-else class="red--text">{{ stockStatus }}</p>
              </v-card-text>
            </v-card>
            <v-container>
              <v-data-table :headers="headers" :items="customStockList"> </v-data-table>
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
import GetStockListByProductIdService from '@app/backoffice/stock/application/find/GetStockListByProductIdService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
const router = useRouter()
const route = useRoute()
const errorRedirectService = new ErrorRedirectService()
const pageTitle = ref()
const productName = ref()
const stockAvailable = ref()
const lowStockThreshold = ref()
const stockStatus = ref()
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')
let customStockList = ref()

const productId: string[] | string = route.params.productId

const headers = [
  { title: 'Entry date', key: 'date' },
  { title: 'Movement tipe', key: 'movement_type' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Notes', key: 'notes' }
]

onMounted(async () => {
  await getStockData(productId)
  getStockLevel()
})

const getStockLevel = (): void => {
      if(stockAvailable.value > lowStockThreshold.value) {
        stockStatus.value = 'Product available!!'
      } else if(stockAvailable.value <= lowStockThreshold.value && stockAvailable.value >= 0){
        stockStatus.value = 'Low stock'
      } else {
        stockStatus.value = 'Out of stock'
      }
}

const getStockData = async (productId: string[] | string): Promise<void> => {
  try {
    const getStockListService = new GetStockListByProductIdService()
    const response = await getStockListService.getApiResponse(productId)
    
    pageTitle.value = response.pageTitle
    productName.value = response.product.name
    lowStockThreshold.value = response.product.low_stock_threshold
    
    //está mal ya que toma los números negativos como  positivos y suma todo
    stockAvailable.value = response.stockMovements.reduce((total: number, item) => {
      return total + item.quantity
    }, 0)

    customStockList.value = response.stockMovements.map((element: any) => ({
      date: element.date.slice(0, 10),
      movement_type: element.movement_type,
      product_name: element.product_name,
      quantity: element.quantity,
      notes: element.notes
    }))

  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      console.log(error)
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
      snackbarMessage.value = error.response.data.message
      snackbar.value = true
    }
  }
}

const addItem = () => {
  //router.push({ name: 'create-stock-item', params: { productId: item.id } });
}

const goBack = () => {
  router.push({ name: 'stock' })
}
</script>
