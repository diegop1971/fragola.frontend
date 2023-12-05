<template>
  <v-main class="d-flex justify-center" style="min-height: 300px;">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="mx-auto">
            <v-layout>
              <v-app-bar color="primary" density="compact">
                <v-spacer></v-spacer>
                <v-btn @click="createNewProduct">New Item</v-btn>
              </v-app-bar>
              <v-main>
                <v-container fluid>
                  <v-data-table :headers="headers" :items="products">
                    <template v-slot:item.actions="{ item }">
                      <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
                      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                  </v-data-table>
                </v-container>
              </v-main>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router'

  import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';
  import type { IProduct}  from '@app/backoffice/products/domain/interfaces/IProduct';
  import GetProductListService from '@app/backoffice/products/application/find/GetProductsListService';

  const errorHandling = new ErrorHandlingService();

  let products = ref<IProduct[]>([]);

  onMounted(async () => {
    try {
        await getProductData();
    } catch (error: any) {
      errorHandling.handleApiError(error);
    }
  });

  const router = useRouter()

  const getProductData = async (): Promise<void> => {
        try {
            const getProductsListService = new GetProductListService();
            const response = await getProductsListService.getApiResponse(); 
            products.value = response;
        } catch(error) {
            console.log(error);
        }
    }

    const headers = [
      {title: 'Product', key: 'name' },
      {title: 'Price', key: 'price' },
      {title: 'Category', key: 'category.name' },
      {title: 'Minimun Quantity', key: 'minimum_quantity'},
      {title: 'Low stock threshold', key: 'low_stock_threshold'},
      {title: 'Low stock alert', key: 'low_stock_alert'},
      {title: 'Enabled', key: 'enabled'},
      {title: 'Actions', key: 'actions', align: 'center' }
    ];

    const getColor = (calories: number): string => {
      if (calories > 100) return 'red';
      else if (calories > 50) return 'orange';
      else return 'green';
    }

    const createNewProduct = () => {
      // Lógica para crear un nuevo ítem
      router.push({ name: 'create-product' });
      console.log('Crear un nuevo ítem');
    }

    const editItem = (item: string) => {
      // Lógica para editar el ítem
      router.push({ name: 'edit-product' });
      console.log('Editar:', item);
    }

    const deleteItem = (item: string) => {
      // Lógica para eliminar el ítem
      router.push({ name: 'delete-product' });
      console.log('Eliminar:', item);
    }

</script>