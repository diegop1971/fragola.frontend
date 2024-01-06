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
                      label="Seleccione una categoría"
                      :items="categoryNamesWithIds"
                      item-value="id"
                      item-title="name"
                      :model="reactiveCategoriesData.name"
                      :rules="[(v) => !!v || 'Item is required']"
                      required
                      @update:modelValue="onCategoryChange"
                      variant="outlined"
                    ></v-select>

                    <v-textarea
                      counter
                      label="Description"
                      v-model="reactiveProductData.description"
                      :rules="descriptionRules"
                      variant="outlined"
                    ></v-textarea>

                    <v-textarea
                      counter
                      label="Short description"
                      v-model="reactiveProductData.description_short"
                      :rules="descriptionShortRules"
                      variant="outlined"
                    ></v-textarea>
                  </v-card-text>
                </v-card>

                <v-card class="mx-auto">
                  <template v-slot:title> Estado del producto </template>
                  <v-card-text>
                    <v-checkbox :label="`Product enabled: `"></v-checkbox>
                  </v-card-text>
                </v-card>

                <v-card class="mx-auto">
                  <template v-slot:title> Precio </template>
                  <v-card-text>
                    <v-text-field
                      v-model="reactiveProductData.price"
                      :rules="priceRules"
                      label="Price"
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
                      label="Low Stock Alert"
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
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

import { ref, onMounted } from 'vue'

import ErrorHandlingService from '@app/shared/application/ErrorHandlingService'
import type { ICreateProduct } from '@app/backoffice/products/domain/interfaces/ICreateProduct'
import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory'
import CreateProductService from '@app/backoffice/products/application/create/CreateProductService'
import GetCategoriesService from '@app/backoffice/products/application/find/GetCategoriesService'

const errorHandling = new ErrorHandlingService()

const reactiveProductData = ref<ICreateProduct>({
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

const reactiveCategoriesData = ref<ICategory>({
  id: 0,
  name: ''
})

const form = ref<HTMLFormElement | null>(null)
const categoryNamesWithIds = ref<ICategory[]>([])
const selectedCategory = ref<number>()
const checkedEnabledProduct = ref<boolean>(true)
let productEnableValue: number = 0
let lowStockAlertSwitchValue = ref<boolean>(false)

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

onMounted(async () => {
  try {
    await getData()
  } catch (error: any) {
    errorHandling.handleApiError(error)
  }
})

const getData = async (): Promise<void> => {
  try {
    const getCategoriesService = new GetCategoriesService()
    const response = await getCategoriesService.getApiResponse()
    const { title, categoriesList } = response

    categoryNamesWithIds.value = categoriesList.map((category: ICategory) => ({
      id: category.id,
      name: category.name
    }))
  } catch (error) {
    errorHandling.handleApiError(error)
  }
}

const onCategoryChange = (newSelectedCategory: number) => {
  selectedCategory.value = newSelectedCategory
}

const onCheckedEnabledProduct = (newProductEnableValue: boolean) => {
  productEnableValue = newProductEnableValue === true ? 1 : 0
  //reactiveProductData.value.enabled = productEnableValue
}

const onSwitchedLowStockAlert = (newValue: any) => {
  lowStockAlertSwitchValue.value = newValue
  //reactiveProductData.value.low_stock_alert = newValue == true ? 1 : 0
}

async function save() {
  if (form.value !== null) {
    //const { valid } = await form.value.validate()
    const valid = true

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

      const updateProductService = new CreateProductService(
        id,
        name,
        price,
        description,
        description_short,
        2,
        minimum_quantity,
        low_stock_threshold,
        reactiveProductData.value.low_stock_alert,
        productEnableValue
      )
      updateProductService.store()
    }
  }
}

const goBack = () => {
  router.go(-1)
}
</script>
