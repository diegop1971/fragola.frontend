<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="grey-lighten-4" flat height="auto" rounded="0">
            <v-toolbar border density="compact">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Create Product</v-toolbar-title>

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
                      :rules="productEnabledRules"
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
                      :rules="priceLowAlertEnabled"
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
                <v-btn
                  color="success"
                  class="mt-4"
                  block
                  :disabled="isSaveButtonDisabled"
                  @click="save"
                >
                  Guardar
                </v-btn>
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
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { ICreateProduct } from '@app/backoffice/products/domain/interfaces/ICreateProduct'
import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory'
import type { IStoreProductResponse } from '@app/backoffice/products/domain/interfaces/IStoreProductResponse'
import StoreProductService from '@app/backoffice/products/application/store/StoreProductService'
import GetCategoriesService from '@app/backoffice/products/application/find/GetCategoriesService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import VuetifyValidationProductFormService from '@app/backoffice/products/application/rules/VuetifyValidationProductFormService'

const router = useRouter()

axios.defaults.withCredentials = true

const errorRedirectService = new ErrorRedirectService()

const reactiveProductData = ref<ICreateProduct>({
  id: '',
  name: '',
  price: 0,
  category_id: '',
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
const selectedCategory = ref<string>('')
const checkedEnabledProduct = ref<boolean>(true)
const isSaveButtonDisabled = ref(false)
let productEnableValue: number = 0
let lowStockAlertSwitchValue = ref<boolean>(false)

let storeResponse: IStoreProductResponse = {
  data: {
    success: false,
    message: '',
    errors: {},
    status: 0
  }
}

const nameRules = [(v: string) => validateProductRuleName(v)]
const descriptionRules = [(v: string) => validateProductRuleDescription(v)]
const descriptionShortRules = [(v: string) => validateProductRuleDescriptionShort(v)]
const productEnabledRules = [(v: boolean) => validateProductRuleProductEnabled(v)]
const priceRules = [(v: number) => validateNumberGreaterThanOne(v)]
const priceLowAlertEnabled = [(v: boolean) => validateProductRuleProductLowAlertEnabled(v)]
const minimumQuantityRules = [(v: number) => validateMinimumQuantityRules(v)]
const lowStockThresholdRules = [(v: number) => validateLowStockThresholdRules(v)]

const validateProductRuleName = async (value: string): Promise<string | boolean> => {
  const validationResult = VuetifyValidationProductFormService.validateProductRuleName(value)
  return validationResult
}

const validateProductRuleDescription = async (value: string): Promise<string | boolean> => {
  const validationResult = VuetifyValidationProductFormService.validateProductRuleDescription(value)
  return validationResult
}

const validateProductRuleDescriptionShort = async (value: string): Promise<string | boolean> => {
  const validationResult =
    VuetifyValidationProductFormService.validateProductRuleDescriptionShort(value)
  return validationResult
}

const validateProductRuleProductEnabled = async (value: boolean): Promise<string | boolean> => {
  const validationResult =
    VuetifyValidationProductFormService.validateProductRuleProductEnabled(value)
  return validationResult
}

const validateNumberGreaterThanOne = async (value: number): Promise<string | boolean> => {
  const validationResult = VuetifyValidationProductFormService.validateNumberGreaterThanOne(value)
  return validationResult
}

const validateMinimumQuantityRules = async (minimumQuantity: number): Promise<string | boolean> => {
  const validationResult = VuetifyValidationProductFormService.validateMinimumQuantityRules(
    minimumQuantity,
    reactiveProductData.value.low_stock_threshold
  )
  return validationResult
}

const validateProductRuleProductLowAlertEnabled = async (
  value: boolean
): Promise<string | boolean> => {
  const validationResult =
    VuetifyValidationProductFormService.validateProductRuleProductLowAlertEnabled(value)
  return validationResult
}

const validateLowStockThresholdRules = async (
  lowStockThreshold: number
): Promise<string | boolean> => {
  const validationResult = VuetifyValidationProductFormService.validateLowStockThresholdRules(
    lowStockThreshold,
    reactiveProductData.value.minimum_quantity
  )
  return validationResult
}

let snackbar: Ref<boolean> = ref(false)

let snackbarMessage: Ref<string> = ref('')

onMounted(async () => {
  await getData()
})

const getData = async (): Promise<void> => {
  try {
    const getCategoriesService = new GetCategoriesService()
    const response = await getCategoriesService.getApiResponse()
    const { categoriesList } = response

    categoryNamesWithIds.value = categoriesList.map((category: ICategory) => ({
      id: category.id,
      name: category.name
    }))
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

const onCategoryChange = (newSelectedCategory: string) => {
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
  isSaveButtonDisabled.value = true
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

      if(!valid) {
        isSaveButtonDisabled.value = false
      }

      const storeProductService = new StoreProductService(
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
      try {
        storeResponse = await storeProductService.store()
        snackbarMessage.value = storeResponse.data.message
        snackbar.value = true
      } catch (error: any) {
        isSaveButtonDisabled.value = false
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
  }
}

const goBack = () => {
  router.push({ name: 'products' })
}
</script>
