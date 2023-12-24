<template>
  <v-main class="d-flex justify-center align-center">
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12" sm="8" md="6">
          <v-form ref="form">
            <v-text-field
              v-model="reactiveProductData.name"
              :counter="10"
              :rules="nameRules"
              label="Name"
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
            ></v-select>

            <v-textarea counter label="Description" :rules="descriptionRules" v-model="reactiveProductData.description"></v-textarea>

            <v-textarea counter label="Short description" :rules="descriptionShortRules" v-model="reactiveProductData.description_short"></v-textarea>

            <v-text-field v-model="reactiveProductData.price" :rules="priceRules" label="Price"></v-text-field>

            <v-checkbox
              v-model="checkedEnabledProduct"
              :label="`Product ${checkedEnabledProduct === true ? 'enabled' : 'disabled'}`"
              @update:model-value="onCheckedEnabledProduct"
            ></v-checkbox>

            <v-btn color="success" class="mt-4" block @click="validate"> Save </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import GetProductService from '@app/backoffice/products/application/find/GetProductService'
import ErrorHandlingService from '@app/shared/application/ErrorHandlingService'
import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory'
import UpdateProductService from '@app/backoffice/products/application/update/UpdateProductService'
import type { IEditProduct } from '@app/backoffice/products/domain/interfaces/IEditProduct'

const route = useRoute()

const errorHandling = new ErrorHandlingService()

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

onMounted(async () => {
  try {
    await getData()
  } catch (error: any) {
    errorHandling.handleApiError(error)
  }
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

    categoryNamesWithIds.value = categories.map((category: ICategory) => ({
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
  console.log((reactiveProductData.value.enabled = productEnableValue))
  //return Boolean(reactiveProductData.value.enabled)
}

async function validate() {
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
        low_stock_threshold,
        low_stock_alert
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
        low_stock_alert,
        productEnableValue
      )
      updateProductService.update()
    }
  }
}
</script>

<style>
/* Estilos específicos del formulario */
.form {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dividir en dos columnas */
  grid-gap: 10px; /* Espacio entre columnas */
  max-width: 600px; /* Ancho máximo del formulario */
  margin: 0 auto; /* Centrar el formulario */
}
.form label {
  display: block;
  margin-bottom: 5px;
}
.form input,
.form select,
.form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
</style>
