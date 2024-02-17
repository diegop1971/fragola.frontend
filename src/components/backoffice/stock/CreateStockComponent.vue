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
                      v-model="selectedCategory"
                      label="Categoria"
                      :items="categoryNamesWithIds"
                      item-value="id"
                      item-title="name"
                      :rules="[(v) => !!v || 'Item is required']"
                      :model="reactiveStockItem.category_name"
                      required
                      @update:modelValue="onCategoryChange"
                      variant="outlined"
                    ></v-select>
                    <v-select
                      v-model="selectedMovementType"
                      label="Movement type"
                      :items="stockMovementTypesNamesWithIds"
                      item-value="id"
                      item-title="name"
                      :rules="[(v) => !!v || 'Item is required']"
                      :model="reactiveStockItem.stock_movemente_type_name"
                      required
                      @update:modelValue="onStockMovementTypeChange"
                      variant="outlined"
                    ></v-select>
                  </v-card-text>
                </v-card>
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

import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory'
import GetCategoriesService from '@app/backoffice/products/application/find/GetCategoriesService'
import type { IStockMovementType } from '@app/backoffice/stock/domain/interfaces/IStockMovementType'
import GetStockMovementTypesService from '@app/backoffice/stock/application/find/GetStockMovementTypesService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import type { ICreateStockItem } from '@app/backoffice/stock/domain/interfaces/ICreateStockItem'

const router = useRouter()
const errorRedirectService = new ErrorRedirectService()

const form = ref<HTMLFormElement | null>(null)
const pageTitle = ref()
const categoryNamesWithIds = ref<ICategory[]>([])
const stockMovementTypesNamesWithIds = ref<ICategory[]>([])
const selectedCategory = ref<string>('')
const selectedMovementType = ref<string>('')

const reactiveStockItem = ref<ICreateStockItem>({
  id: '',
  product_id: '',
  movement_type_id: '',
  quantity: 0,
  date: '',
  notes: '',
  enabled: false,
  created_at: '',
  updated_at: '',
  category_name: '',
  stock_movemente_type_name: ''
})

let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

onMounted(async () => {
  await getStockData()
})

const getStockData = async (): Promise<void> => {
  try {
    const getCategoriesService = new GetCategoriesService()
    const getCategoriesResponse = await getCategoriesService.getApiResponse()
    const { categoriesList } = getCategoriesResponse

    categoryNamesWithIds.value = categoriesList.map((category: ICategory) => ({
      id: category.id,
      name: category.name
    }))

    const getStockMovementTypesService = new GetStockMovementTypesService()
    const getStockMovementTypesResponse = await getStockMovementTypesService.getApiResponse()
    const { stockMovementTypes } = getStockMovementTypesResponse

    stockMovementTypesNamesWithIds.value = stockMovementTypes.map((stockMovementType: IStockMovementType) => ({
      id: stockMovementType.id,
      name: stockMovementType.movement_type
    }))

    //pageTitle.value = `${response.pageTitle}`
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

const onCategoryChange = (newSelectedCategory: string) => {
  selectedCategory.value = newSelectedCategory
}

const onStockMovementTypeChange = (newSelectedStockMovementType: string) => {
  selectedMovementType.value = newSelectedStockMovementType
}

const goBack = () => {
  router.push({ name: 'stock' })
}
</script>
