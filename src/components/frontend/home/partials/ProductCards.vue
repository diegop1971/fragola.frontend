<template>
    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        <div class="col mb-5" v-for="product in products.homeProducts" :key="product.id">
            <div class="card h-100">
                <!-- Sale badge-->
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                <!-- Product image-->
                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">{{ product.name }}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through">$ {{ product.price }}</span>
                        {{ product.price }}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="d-flex justify-content-center mb-3">
                    <a href="#" v-on:click.prevent="onAddToCart(product.id)" class="btn btn-primary">Agregar Producto</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import { onMounted } from 'vue';
    import axios, { AxiosError } from 'axios';
    import type { IApiResponse}  from '@/interfaces/IApiResponse';
    import GetProductCardListService from '@/services/home/GetProductsCardListService';
    import AddProductToCartService from '@/services/cart/AddProductToCartService';
    import ErrorHandlingService from '@/services/shared/ErrorHandlingService';
    import GetCartProductsService from '@/services/cart/GetCartProductsService';

    import { useCartItemCountStore } from '@/stores/cartItemCount.ts';
    const cartItemCountStore = useCartItemCountStore();

    axios.defaults.withCredentials = true;

    const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([]);

    const products = ref<IApiResponse>({
        title: '',
        metaDescription: '',
        homeProducts: []
    });

    const errorHandling = new ErrorHandlingService();
    const productService = new GetProductCardListService();

    onMounted(async () => {
      try {
          await getItems();
          let cant = await cantItems();
          cartItemCountStore.refreshQty(cant);
          const response = await productService.getApiResponse();
        products.value = response;
      } catch (error: any) {
        errorHandling.handleApiError(error);
      }
    });

    const getItems = async (): Promise<void> => {
        try {
            const getCartProducts = new GetCartProductsService();
            const response = await getCartProducts.getProductsList();

            sessionCartItems.value = response.data.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productQty: item.productQty,
                productUnitPrice: item.productUnitPrice,
                subtotal: item.productQty * item.productUnitPrice, 
            }));
        } catch(error) {
            console.log(error);
        }
    }

    const cantItems = async () => {
       let cant = await sessionCartItems.value.reduce((cant, item) => cant + item.productQty, 0);
       return cant;
    }

    const productQty:number = 1;

    const onAddToCart = async (productId: string) => {
      try {
        const addProductToCartService = new AddProductToCartService(productId, productQty);
        const response = await addProductToCartService.getAddToCartResponse();
        cartItemCountStore.incrementBy(productQty);

      } catch (error) {
        errorHandling.handleApiError(error);
      }
    }
    
</script>
