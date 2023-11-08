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
    import type { Ref } from 'vue';
    import { onMounted } from 'vue';
    import axios from 'axios';
    import { useCartStore } from '@/stores/cartStore';

    import type { IApiResponse}  from '@/interfaces/IApiResponse';
    import GetProductCardListService from '@app/frontoffice/catalog/application/find/GetProductsCardListService';
    import CartProductCreatorService from '@app/frontoffice/cart/application/create/CartProductCreatorService';
    import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';
    import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService';
    import type { ISessionCartItemResponse } from '@/interfaces/ISessionCartItemResponse';

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
