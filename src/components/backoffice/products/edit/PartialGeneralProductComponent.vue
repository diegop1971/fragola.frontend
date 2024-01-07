<template>
  <v-main class="d-flex align-center">
    <v-container fluid text-left>
      <v-row align-start>
        <v-col cols="12" sm="8" md="6" xl="9">
          <v-form ref="form">
            <v-card class="mx-auto">
              <template v-slot:title> Datos generales </template>

              <v-card-text>
                <v-text-field
                  v-model="reactiveProductData.name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  variant="outlined"
                >
                </v-text-field>

                <v-select
                  v-model="selectedCategory"
                  label="Categoria"
                  :items="categoryNamesWithIds"
                  item-value="id"
                  item-title="name"
                  :rules="[(v) => !!v || 'Item is required']"
                  :model="reactiveProductData.category_name"
                  required
                  @update:modelValue="onCategoryChange"
                  variant="outlined"
                ></v-select>

                <v-textarea
                  counter
                  label="Description"
                  :rules="descriptionRules"
                  v-model="reactiveProductData.description"
                  variant="outlined"
                ></v-textarea>

                <v-textarea
                  counter
                  label="Short description"
                  :rules="descriptionShortRules"
                  v-model="reactiveProductData.description_short"
                  variant="outlined"
                ></v-textarea>
              </v-card-text>
            </v-card>

            <v-card class="mx-auto">
              <template v-slot:title> Estado del producto </template>
              <v-card-text>
                <v-checkbox
                  v-model="checkedEnabledProduct"
                  :label="`Product enabled: ${checkedEnabledProduct === true ? 'yes' : 'no'}`"
                  @update:model-value="onCheckedEnabledProduct"
                ></v-checkbox>
              </v-card-text>
            </v-card>

            <v-card class="mx-auto">
              <template v-slot:title> Precio </template>
              <v-card-text>
                <v-text-field
                  v-model="reactiveProductData.price"
                  label="Price"
                  :rules="priceRules"
                  variant="outlined"
                ></v-text-field>
              </v-card-text>
            </v-card>

            <v-card class="mx-auto">
              <template v-slot:title> Control de stock </template>

              <v-card-text>
                <v-switch
                  v-model="lowStockAlertSwitchValue"
                  hide-details
                  :label="`Low Stock Alert: ${
                    lowStockAlertSwitchValue == true ? 'enabled' : 'disabled'
                  }`"
                  @update:model-value="onSwitchedLowStockAlert"
                ></v-switch>

                <v-text-field
                  v-model="reactiveProductData.minimum_quantity"
                  :rules="minimumQuantityRules"
                  label="Minimum Quantity"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="reactiveProductData.low_stock_threshold"
                  :rules="lowStockThresholdRules"
                  label="Low stock threshold"
                  variant="outlined"
                ></v-text-field>
              </v-card-text>
            </v-card>
            <v-btn color="success" class="mt-4" block @click="save"> Save </v-btn>
          </v-form>
          <v-snackbar v-model="snackbar" multi-line>
            {{ updateResponse.data.message }}
            <template v-slot:actions>
              <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'

import GetProductService from '@app/backoffice/products/application/find/GetProductService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory'
import UpdateProductService from '@app/backoffice/products/application/update/UpdateProductService'
import type { IEditProduct } from '@app/backoffice/products/domain/interfaces/IEditProduct'
import type { IUpdateProductResponse } from '@app/backoffice/products/domain/interfaces/IUpdateProductResponse'
import type { IApiErrorResponse } from '@app/shared/domain/interfaces/IApiErrorResponse'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'

const route = useRoute()

const errorRedirectService = new ErrorRedirectService()

const reactiveProductData = ref<IEditProduct>({
  id: '',
  name: '',
  price: 0,
  category_id: 0,
  category_name: '',
  description: '',
  description_short: '',
  minimum_quantity: 0,
  low_stock_threshold: 0,
  low_stock_alert: 0,
  enabled: 1
})

const form = ref<HTMLFormElement | null>(null)
const categoryNamesWithIds = ref<ICategory[]>([])
const selectedCategory = ref<number>(0)
const checkedEnabledProduct = ref<boolean>(true)
let productEnableValue: number = 0
let lowStockAlertSwitchValue = ref<boolean>(false)

let updateResponse: IUpdateProductResponse = {
  data: {
    success: false,
    message: '',
    errors: {},
    status: 0
  }
}

const nameRules = [
  (v: string) => !!v || 'El nombre es requerido',
  (v: string) => (v && v.length <= 50) || 'El nombre debe ser menor a 50 caracteres'
]

const descriptionShortRules = [
  (v: string) => !!v || 'La descripcion corta del producto es requerida',
  (v: string) => (v && v.length <= 150) || 'La descripcion debe ser menor a 250 caracteres'
]

const descriptionRules = [
  (v: string) => !!v || 'La descripcion del producto es requerida',
  (v: string) => (v && v.length <= 250) || 'La descripcion debe ser menor a 250 caracteres'
]

const priceRules = [
  (v: number) => !!v || 'El precio es requerido',
  (v: number) => (!isNaN(v) && v >= 0) || 'El precio debe ser un número mayor o igual a 0'
]

const minimumQuantityRules = [
  (v: number) => !!v || 'Cantidad mínima es requerida',
  (v: number) => (!isNaN(v) && v >= 1) || 'La cantidad mínima debe ser un número mayor o igual a 1'
]

const lowStockThresholdRules = [
  (v: number) => !!v || 'Este campo es obligatorio',
  (v: number) =>
    (!isNaN(v) && v >= reactiveProductData.value.minimum_quantity) ||
    'Debe ser un número mayor o igual a cantidad minima'
]

let snackbar: Ref<boolean> = ref(false)

onMounted(async () => {
  await getData()
})

const getData = async (): Promise<void> => {
  try {
    const productId: string[] | string = route.params.productId
    const getProductsListService = new GetProductService()
    const response = await getProductsListService.getApiResponse(productId)
    const { productList, categories } = response
    const {
      id,
      name,
      price,
      category_id,
      category_name,
      description,
      description_short,
      minimum_quantity,
      low_stock_threshold,
      low_stock_alert,
      enabled
    } = productList

    reactiveProductData.value = {
      id,
      name,
      price,
      category_id,
      category_name,
      description,
      description_short,
      minimum_quantity,
      low_stock_threshold,
      low_stock_alert,
      enabled
    }

    selectedCategory.value = category_id
    checkedEnabledProduct.value = enabled === 1 ? true : false
    lowStockAlertSwitchValue.value = low_stock_alert === 1 ? true : false
    categoryNamesWithIds.value = categories.map((category: ICategory) => ({
      id: category.id,
      name: category.name
    }))
  } catch (error: any) {
    console.log(error)
    const apiErrorHandler = new ApiErrorHandler()
    const errorResponse: IApiErrorResponse = apiErrorHandler.handleError(error)
    errorRedirectService.handleApiError(errorResponse.data.status)
  }
}

const onCategoryChange = (newSelectedCategory: number) => {
  selectedCategory.value = newSelectedCategory
}

const onCheckedEnabledProduct = (newProductEnableValue: boolean) => {
  productEnableValue = newProductEnableValue === true ? 1 : 0
  reactiveProductData.value.enabled = productEnableValue
}

const onSwitchedLowStockAlert = (newValue: any) => {
  lowStockAlertSwitchValue.value = newValue
  reactiveProductData.value.low_stock_alert = newValue == true ? 1 : 0
}

async function save() {
  if (form.value !== null) {
    const { valid } = await form.value.validate()
    if (valid) {
      const {
        id,
        name,
        price,
        description,
        description_short,
        minimum_quantity,
        low_stock_threshold
      } = reactiveProductData.value

      const updateProductService = new UpdateProductService(
        id,
        name,
        price,
        description,
        description_short,
        selectedCategory.value,
        minimum_quantity,
        low_stock_threshold,
        reactiveProductData.value.low_stock_alert,
        productEnableValue
      )
      updateResponse = await updateProductService.update()
    }
    await errorRedirectService.handleApiError(updateResponse.data.status)

    snackbar.value = true
  }
}
</script>
