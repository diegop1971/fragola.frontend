<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <p>General</p>
          <form>
            <v-text-field
              v-model="state.name"
              label="Name"
            ></v-text-field>

            <v-text-field
              v-model="state.price"
              label="Price"
            ></v-text-field>

            <v-btn
              class="me-4"
            >
              submit
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'
import { useRoute  } from 'vue-router'
import { reactive } from 'vue'

import GetProductService from '@app/backoffice/products/application/find/GetProductService'
import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';

interface IProductData {
  name: string;
  price: number;
}

const route = useRoute();
const errorHandling = new ErrorHandlingService()

const productData: IProductData = {
  name: '',
  price: 0,
}

const state: IProductData = reactive({
  ...productData,
})

onMounted(async () => {
  try {
      await getProductData();
  } catch (error: any) {
    errorHandling.handleApiError(error);
  }
});

const getProductData = async (): Promise<void> => {
  try {
      const productId: string[] | string  = route.params.productId;
      const getProductsListService = new GetProductService();
      const response = await getProductsListService.getApiResponse(productId); 
      state.name = response.productList.name
      state.price = response.productList.price
  } catch(error) {
      console.log(error);
  }
}

</script>