<template>
  <v-main class="d-flex justify-center" style="min-height: 300px;">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-data-table :headers="headers" :items="products">

            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import { onMounted } from 'vue';

  import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';
  import type { IProduct}  from '@app/backoffice/products/domain/interfaces/IProduct';
  import GetProductListService from '@app/backoffice/products/application/find/GetProductsListService';

  const errorHandling = new ErrorHandlingService();

  let products = ref<IProduct[]>([{
          id: '',
          category_id: 0,
          name: '',
          description: '',
          description_short: '',
          price: 0,
          minimum_quantity: 0,
          low_stock_threshold: 0,
          low_stock_alert: 0,
          enabled: 0,
          created_at: '',
          updated_at: '',
        }]);

  onMounted(async () => {
    try {
        await getProductData();
    } catch (error: any) {
      errorHandling.handleApiError(error);
    }
  });

  const getProductData = async (): Promise<void> => {
        try {
            const getProductsListService = new GetProductListService();
            const response = await getProductsListService.getApiResponse(); 
            products.value = response;
            console.log(products.value);
        } catch(error) {
            console.log(error);
        }
    }

    const headers = [
      { title: 'Product', key: 'name' },
      { title: 'Price', key: 'price' },
      {title: 'Description Short', key: 'description_short'},
      {title: 'Minimun Quantity', key: 'minimum_quantity'},
      {title: 'Low stock threshold quantity', key: 'low_stock_threshold'},
      {title: 'Low stock alert', key: 'low_stock_alert'},
      {title: 'Enabled', key: 'enabled'},
      { title: 'Actions', key: 'actions', align: 'center' } // Nueva columna para acciones
    ];

    const getColor = (calories: number): string => {
      if (calories > 100) return 'red';
      else if (calories > 50) return 'orange';
      else return 'green';
    }

    const editItem = (item: string) => {
      // Lógica para editar el ítem
      console.log('Editar:', item);
    }

    const deleteItem = (item: string) => {
      // Lógica para eliminar el ítem
      console.log('Eliminar:', item);
    }

</script>