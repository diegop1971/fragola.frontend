<template>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col cols="10">
          <v-row no-gutters class="justify-center">
            <v-col
                v-for="product in products.homeProducts" :key="product.id"
                class="d-flex child-flex"
                cols="3"
            >
                <v-container fluid class="text-center">
                <!-- Inicio del enlace -->
                <a :href="`https://vuetifyjs.com/product/${1}`" class="text-decoration-none">
                    <!-- Contenido dentro del enlace -->
                    <div>
                    <!-- Imagen -->
                    <v-img
                        :src="`http://localhost:8000/images/catalog/320x320.png`"
                        :lazy-src="`http://localhost:8000/images/catalog/320x320.png`"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2 rounded-image"
                        height="320"
                        max-height="320"
                    >
                        <template v-slot:placeholder>
                        <!-- ... -->
                        </template>
                    </v-img>
                    
                    <!-- Descripción, reseñas, precio, botón, etc. -->
                    <p class="mt-2 text-description" style="font-size: 14px">{{ product.name }} {{ 1 }}</p>
                    <div class="d-flex justify-center align-center flex-wrap" style="font-size: 12px">
                        <div class="d-flex align-center mr-1 text-review">
                        <span>{{ Math.floor(Math.random() * 50) }} reseñas</span>
                        <v-icon class="star-icon" style="font-size: 14px">mdi-star</v-icon>
                        </div>
                        <div style="font-family: 'Arial', sans-serif; color: #666;">
                        Tienda: Nombre de la tienda
                        </div>
                    </div>
                    <div class="mt-1">
                        <p class="text-center">
                        <span class="price-bold" style="font-size: 18px">USD 1,99</span>
                        <span class="price-discount" style="font-size: 14px"> - >$ {{ product.price }} (30% de descuento)</span>
                        </p>
                    </div>
                    <v-btn
                        color="primary"
                        class="mt-1"
                        font-size="16px"
                        block
                    >
                        <a href="#" v-on:click.prevent="onAddToCart(product.id)" class="btn btn-primary" style="color: white; text-decoration: none;">Agregar Producto</a>
                    </v-btn>
                    </div>
                    <!-- Fin del contenido dentro del enlace -->
                </a>
                <!-- Fin del enlace -->
                </v-container>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup lang="ts">
    import {ref} from 'vue';
    import type { Ref } from 'vue';
    import { onMounted } from 'vue';
    import axios from 'axios';
    import { useCartStore } from '@/stores/cartStore';

    import type { IApiResponse}  from '@app/frontoffice/catalog/domain/interfaces/IApiResponse';
    import GetProductCardListService from '@app/frontoffice/catalog/application/find/GetProductsCardListService';
    import CartProductCreatorService from '@app/frontoffice/cart/application/create/CartProductCreatorService';
    import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';
    import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService';
    import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse';

    const cartStore = useCartStore();
    const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0);
    const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0);

    const products = ref<IApiResponse>({
            title: '',
            metaDescription: '',
            homeProducts: []
          });

    const errorHandling = new ErrorHandlingService();
    const productService = new GetProductCardListService();

    axios.defaults.withCredentials = true;

    onMounted(async () => {
      try {
            await getCartData();
            cartStore.refreshQty(cartTotalItemCount.value); 
            cartStore.refreshTotalAmountCart(cartTotalAmount.value);
            const response = await productService.getApiResponse();
            products.value = response;
            cartStore.showCollapsed(true);
      } catch (error: any) {
        errorHandling.handleApiError(error);
      }
    });

    const productQty:number = 1;

    const onAddToCart = async (productId: string) => {
      try {
        const cartProductCreatorService = new CartProductCreatorService(productId, productQty);
        await cartProductCreatorService.create();
        await getCartData();
        cartStore.refreshQty(cartTotalItemCount.value);
        cartStore.refreshTotalAmountCart(cartTotalAmount.value);
      } catch (error) {
        errorHandling.handleApiError(error);
      }
    }

    const getCartData = async (): Promise<void> => {
        try {
            const getCartProducts = new CartProductsGetterService();
            const response = await getCartProducts.getCartProductsList();

            cartTotalItemCount.value = response.cartTotalItemCount;
            cartTotalAmount.value = response.cartTotalAmount;
            cartStore.refreshCartItems(response.sessionCartItems);
        } catch(error) {
            console.log(error);
        }
    }
</script>

<style lang="scss" scoped>
  .rounded-image {
    border-radius: 4px;
  }

  .price-bold {
    font-weight: bold;
    font-size: 20px;
    color: #1b5e20;
  }

  .price-discount {
    font-size: 16px;
    color: #616161;
  }

  .text-description {
    color: #333;
  }

  .text-review {
    color: #333;
  }

  .star-icon {
    color: #333;
  }

</style>
