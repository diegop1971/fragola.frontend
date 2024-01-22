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
                  label="Minimum Quantity"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="reactiveProductData.low_stock_threshold"
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
import type { IApiGetProductResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductResponse'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import VuetifyValidationProductFormService from '@app/backoffice/products/application/rules/VuetifyValidationProductFormService'

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

onMounted(async () => {
  await getData()
})

const getData = async (): Promise<void> => {
  try {
    const productId: string[] | string = route.params.productId
    const getProductsListService = new GetProductService()
    const response = await getProductsListService.getApiResponse(productId)

    if ('productList' in response && 'categories' in response) {
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
    }
  } catch (error: any) {
    if (error.code ==="ERR_NETWORK") {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
    const errorResponse: IApiErrorResponse = apiErrorHandler.handleError(error.response.data.status)
    errorRedirectService.handleApiError(error.response.data.status)
    }

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
    /*if(updateResponse.data.status === 503) {
      await errorRedirectService.handleApiError(updateResponse.data.status)
    }*/

    snackbar.value = true
  }
}
</script>
