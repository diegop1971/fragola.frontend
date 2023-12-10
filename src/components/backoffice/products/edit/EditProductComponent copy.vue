<template>
    <v-main class="d-flex justify-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-card color="grey-lighten-4" flat height="1000px" rounded="0">
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
                  <v-card color="basil">        
                  <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                    <v-tab v-for="item in items" :key="item" :value="item">
                      {{ item }}
                    </v-tab>
                  </v-tabs>
                  <v-card>
                    <v-card-text>
                      <component :is="selectedTabComponent" v-bind="tabProps" />
                    </v-card-text>
                  </v-card>
                </v-card>
                </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script setup lang="ts">

  import { ref } from 'vue';
  import { watch } from 'vue';
  import { useRouter, useRoute  } from 'vue-router'
  import { onMounted } from 'vue'

  import GetProductService from '@app/backoffice/products/application/find/GetProductService'
  import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';

  import GeneralComponent from '@/components/backoffice/products/edit/PartialGeneralProductComponent.vue';
  import DataComponent from '@/components/backoffice/products/edit/PartialDataProductComponent.vue';
  import ImageComponent from '@/components/backoffice/products/edit/PartialImageProductComponent.vue';

  const errorHandling = new ErrorHandlingService();

  const router = useRouter();
  const route = useRoute();

  const tab = ref('General');
  const items = ['General', 'Data', 'Image'];
  let selectedTabComponent = GeneralComponent;
  let tabProps = {};
  
  watch(tab, (newTab) => {
    switch (newTab) {
      case 'General':
        selectedTabComponent = GeneralComponent;
        break;
      case 'Data':
        selectedTabComponent = DataComponent;
        break;
      case 'Image':
        selectedTabComponent = ImageComponent;
        break;
    }
  });

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
        console.log(response.productList.name);
    } catch(error) {
        console.log(error);
    }
  }

  const goBack = () => {
    router.go(-1);
  }

</script>