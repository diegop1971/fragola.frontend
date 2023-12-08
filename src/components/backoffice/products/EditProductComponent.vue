<template>
    <v-main class="d-flex justify-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-card
              color="grey-lighten-4"
              flat
              height="1000px"
              rounded="0"
            >
              <v-toolbar border density="compact">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
                <v-toolbar-title>Edit Product</v-toolbar-title>
  
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
                  
                </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script setup lang="ts">

  import { useRouter, useRoute  } from 'vue-router'
  import { onMounted } from 'vue'

  import GetProductService from '@app/backoffice/products/application/GetProductService'
  import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';

  const errorHandling = new ErrorHandlingService();

  const router = useRouter();
  const route = useRoute();

  onMounted(async () => {
    try {
        await getProductData();
    } catch (error: any) {
      errorHandling.handleApiError(error);
    }
  });

  const getProductData = async (): Promise<void> => {
      try {
          const id: string = route.params.id;
          const getProductsListService = new GetProductService();
          const response = await getProductsListService.getApiResponse(id); 
          console.log(response.productList.name);
      } catch(error) {
          console.log(error);
      }
  }

  const goBack = () => {
    router.go(-1);
  }

</script>