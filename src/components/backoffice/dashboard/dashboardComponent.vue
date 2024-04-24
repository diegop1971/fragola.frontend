<template>
  <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-icon>mdi-chart-line</v-icon>
              Gráfico de ventas
            </v-card-title>
            <v-card-text>
              <canvas id="chart"></canvas>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" >
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-icon>mdi-table</v-icon>
              Tabla de clientes
            </v-card-title>
            <v-card-text>
            <v-data-table
                :headers="headers"
                :items="data"
            ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</v-main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import type { IApiGetOrdersResponse } from '@app/backoffice/orders/domain/interfaces/IApiGetOrdersResponse'
import GetOrdersService from '@app/backoffice/orders/application/find/GetOrdersService';
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'

const errorRedirectService = new ErrorRedirectService()

onMounted(async () => {
  await getOrders()
})

const getOrders = async (): Promise<void> => {
  try {
    const getOrdersService = new GetOrdersService()
    const response: IApiGetOrdersResponse = await getOrdersService.getOrders()
    console.log(response.orders)
    //products.value = response.orders
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
      //snackbarMessage.value = error.response.data.message
      //snackbar.value = true
    }
  }
}

  const headers = [
                    {
                      text: 'Nombre',
                      value: 'name',
                    },
                    {
                      text: 'Correo electrónico',
                      value: 'email',
                    },
                    {
                      text: 'Teléfono',
                      value: 'phone',
                    },
                  ];
  
  const data = [
                  {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                  },
                  {
                    name: 'Jane Doe',
                    email: 'janedoe@example.com',
                    phone: '987-654-3210',
                  },
                ];

</script>