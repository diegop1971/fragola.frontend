<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-form ref="form">
            <v-text-field
              v-model="reactiveProductData.name"
              :counter="10"
              :rules="nameRules"
              label="Name"
            >
            </v-text-field>

            <v-text-field v-model="reactiveProductData.price" :rules="priceRules" label="Price">
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

            <v-btn color="success" class="mt-4" block @click="validate"> Validate </v-btn>
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

interface IProductData {
  id: string
  name: string
  price: number
  category_id: number
  category_name: string
}

const route = useRoute()

const errorHandling = new ErrorHandlingService()

const reactiveProductData = ref<IProductData>({
  id: '',
  name: '',
  price: 0,
  category_id: 0,
  category_name: ''
})

const categoryNamesWithIds = ref<ICategory[]>([])
const selectedCategory = ref<number>(0)

const nameRules = [
  (v: string) => !!v || 'El nombre es requerido',
  (v: string) => (v && v.length <= 50) || 'El nombre debe ser menor a 50 caracteres'
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
    const { id, name, price, category_name, category_id } = productList

    reactiveProductData.value = { id, name, price, category_name, category_id }
    selectedCategory.value = category_id
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

const form = ref<any>(null)

async function validate() {
  const { valid } = await form.value.validate()
  if (valid) alert('Form is valid')
}
</script>
