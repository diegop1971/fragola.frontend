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
                  v-model="reactiveStockData.movement_type"
                  :counter="10"
                  label="Tipo de movimiento"
                  variant="outlined"
                >
                </v-text-field>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import GetStockItemService from '@app/backoffice/stock/application/find/GetStockItemService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import UpdateProductService from '@app/backoffice/products/application/update/UpdateProductService'
import type { IEditStockItem } from '@app/backoffice/stock/domain/interfaces/IEditStockItem'
//import type { IUpdateStockItemResponse } from '@app/backoffice/stock/domain/interfaces/IUpdateStockItemResponse'

import ApiErrorHandler from '@app/backoffice/products/application/errors/ApiErrorHandlerService'
import VuetifyValidationProductFormService from '@app/backoffice/products/application/rules/VuetifyValidationProductFormService'

const route = useRoute()

const errorRedirectService = new ErrorRedirectService()

const reactiveStockData = ref<IEditStockItem>({
  id: '',
  product_id: '',
  movement_type_id: '',
  quantity: 0,
  date: '',
  notes: '',
  enabled: false,
  created_at: '',
  updated_at: '',
  movement_type: '',
  product_name: ''
})

const form = ref<HTMLFormElement | null>(null)
const checkedEnabledProduct = ref<boolean>(true)
let productEnableValue: number = 0

let updateResponse: IUpdateStockItemResponse = {
  data: {
    success: false,
    message: '',
    errors: {},
    status: 0
  }
}

onMounted(async () => {
  await getData()
})

const getData = async (): Promise<void> => {
  try {
    const stockId: string[] | string = route.params.stockId
    const getStockItemService = new GetStockItemService()
    const response = await getStockItemService.getApiResponse(stockId)
    if ('stockItem' in response) {
      const { stockItem } = response

      reactiveStockData.value = {
        id: stockItem.id,
        product_id: stockItem.product_id,
        movement_type_id: stockItem.movement_type_id,
        quantity: stockItem.quantity,
        date: stockItem.date,
        notes: stockItem.notes,
        enabled: stockItem.enabled,
        created_at: stockItem.created_at,
        updated_at: stockItem.updated_at,
        movement_type: stockItem.movement_type,
        product_name: stockItem.product_name,
      }
    }
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
    }
  }
}
</script>
