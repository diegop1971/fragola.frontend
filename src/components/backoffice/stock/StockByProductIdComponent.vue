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
            <v-container>
              <v-data-table :headers="headers" :items="customStockList">
                <template v-slot:item.enabled="{ item }">
                  <td>{{ item.enabled ? 'yes' : 'no' }}</td>
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

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import GetStockListByProductIdService from '@app/backoffice/stock/application/find/GetStockListByProductIdService'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
const router = useRouter()
const route = useRoute()
const errorRedirectService = new ErrorRedirectService()
const pageTitle = ref()
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')
let customStockList = ref() 

const productId: string[] | string = route.params.productId

const headers = [
  { title: 'Entry date', key: 'date' },
  { title: 'Movement tipe', key: 'movement_type'},
  { title: 'Quantity', key: 'quantity' },
  { title: 'Notes', key: 'notes' },
]

onMounted(async () => {
  await getStockData(productId)
})

const getStockData = async (productId: string[] | string): Promise<void> => {
  try {
    const getStockListService = new GetStockListByProductIdService()
    const response = await getStockListService.getApiResponse(productId)

    customStockList.value = response.stockItem.map((element: any) => ({
      date: element.date.slice(0,10),
      movement_type: element.movement_type,
      product_name: element.product_name,
      quantity: element.quantity,
      notes: element.notes,
    }))

    pageTitle.value = `${response.pageTitle} - ${customStockList.value[0].product_name}`

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

const addItem = () => {
  router.push({ name: 'create-product' })
}

const goBack = () => {
  router.push({ name: 'stock' })
}
</script>