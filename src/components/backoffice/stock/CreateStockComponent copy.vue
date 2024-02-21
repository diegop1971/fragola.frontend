<template>
  <v-main class="d-flex justify-center">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="grey-lighten-4" flat height="1000px" rounded="0">
            <v-toolbar border density="compact" flat>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn small @click="goBack()" class="align-self-center">
                <v-icon>mdi-arrow-left</v-icon>
                Go Back
              </v-btn>
            </v-toolbar>
            <v-container fluid>
              <v-form ref="form">
                <v-card class="mx-auto">
                  <template v-slot:title> Datos generales </template>
                  <v-card-text>
                    <v-select
                      v-model="selectedProduct"
                      label="Product"
                      :items="productNamesWithIds"
                      item-value="id"
                      item-title="name"
                      :rules="[(v) => !!v || 'Item is required']"
                      :model="product_name"
                      required
                      @update:modelValue="onProductChange"
                      variant="outlined"
                    ></v-select>
                    <v-select
                      v-model="selectedMovementType"
                      label="Movement type"
                      :items="stockMovementTypesNamesWithIds"
                      item-value="id"
                      item-title="movement_type"
                      :rules="[(v) => !!v || 'Item is required']"
                      :model="stock_movemente_type_name"
                      required
                      @update:modelValue="onStockMovementTypeChange"
                      variant="outlined"
                    ></v-select>
                    <v-text-field
                      v-model="reactiveStockItem.quantity"
                      label="Quantity"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      @click="showDatePicker"
                      v-model="formattedDate"
                      label="Fecha"
                      readonly
                    ></v-text-field>

                    <v-date-picker
                      v-show="showPicker"
                      v-model="selectedDate"
                      defaultDate="selectedDate.value"
                      @update:modelValue="updateDate"
                    ></v-date-picker>

                    <v-card-text>
                      <v-checkbox
                        v-model="checkedEnabledProduct"
                        :label="`Product enabled: ${checkedEnabledProduct === true ? 'yes' : 'no'}`"
                        @update:model-value="onCheckedEnabledProduct"
                      ></v-checkbox>
                    </v-card-text>
                  </v-card-text>
                </v-card>
                <v-btn color="success" class="mt-4" block @click="save"> Save </v-btn>
              </v-form>

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
import { computed } from 'vue'

import type { IProduct } from '@app/backoffice/stock/domain/interfaces/IProduct'
import type { IStockMovementType } from '@app/backoffice/stock/domain/interfaces/IStockMovementType'
import type { IStoreStockItem } from '@app/backoffice/stock/domain/interfaces/IStoreStockItem'
import type { IStoreStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IStoreStockItemResponse'

import GetProductsService from '@app/backoffice/stock/application/find/GetProductsService'
import GetStockMovementTypesService from '@app/backoffice/stock/application/find/GetStockMovementTypesService'
import StoreStockItemService from '@app/backoffice/stock/application/store/StoreStockItemService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'

const router = useRouter()
const errorRedirectService = new ErrorRedirectService()

const form = ref<HTMLFormElement | null>(null)
const pageTitle = ref()
const productNamesWithIds = ref<IProduct[]>([])
const stockMovementTypesNamesWithIds = ref<IStockMovementType[]>([])
const product_name = ref<string>('')
const stock_movemente_type_name = ref<string>('')
const selectedProduct = ref<string>('')
const selectedMovementType = ref<string>('')
let showPicker = ref(false)
const checkedEnabledProduct = ref<boolean>(true)
let productEnableValue: number = 0

const reactiveStockItem = ref<IStoreStockItem>({
  id: '',
  product_id: '',
  movement_type_id: '',
  quantity: 0,
  date: '',
  notes: '',
  enabled: 0
})

let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

let storeResponse: IStoreStockItemResponse = {
  success: false,
  message: '',
  code: 0
}

const selectedDate = ref(new Date())
let formattedDate = ''

onMounted(async () => {
  await getData()
  formattedDateComputed.value
})

const formattedDateComputed = computed(() => {
  if (selectedDate.value) {
    formattedDate = selectedDate.value.toISOString().slice(0, 19)
    return formattedDate
  }
  return ''
})

const updateDate = (date: Date | string) => {
  showPicker.value = false
  selectedDate.value = new Date(date)
  console.log('date:', date)
  formattedDate = ''
  formattedDateComputed.value
}

const getData = async (): Promise<void> => {
  try {
    const getProductsService = new GetProductsService()
    const getProductsResponse = await getProductsService.getApiResponse()
    const { products } = getProductsResponse
    productNamesWithIds.value = products

    const getStockMovementTypesService = new GetStockMovementTypesService()
    const getStockMovementTypesResponse = await getStockMovementTypesService.getApiResponse()
    const { stockMovementTypes } = getStockMovementTypesResponse
    stockMovementTypesNamesWithIds.value = stockMovementTypes

    pageTitle.value = 'Create stock item'
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

const save = async () => {
  console.log('save: ', formattedDate)
  const storeStockItemService = new StoreStockItemService(
    selectedProduct.value,
    selectedMovementType.value,
    reactiveStockItem.value.quantity,
    formattedDate,
    'ñljklj',
    1

    /*reactiveStockItem.value.date,
    reactiveStockItem.value.notes,
    reactiveStockItem.value.enabled*/
  )

  try {
    /*storeResponse = await storeStockItemService.store()
    snackbarMessage.value = storeResponse.message
    snackbar.value = true*/
  } catch (error: any) {
    //isSaveButtonDisabled.value = false
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

const onProductChange = (newSelectedProduct: string) => {
  selectedProduct.value = newSelectedProduct
}

const onStockMovementTypeChange = (newSelectedStockMovementType: string) => {
  selectedMovementType.value = newSelectedStockMovementType
}

const onCheckedEnabledProduct = (newProductEnableValue: boolean) => {
  productEnableValue = newProductEnableValue === true ? 1 : 0
  reactiveStockItem.value.enabled = productEnableValue
}

const showDatePicker = () => {
  if (showPicker.value) {
    showPicker.value = false
  } else {
    showPicker.value = true
  }
}

const goBack = () => {
  router.push({ name: 'stock' })
}
</script>
