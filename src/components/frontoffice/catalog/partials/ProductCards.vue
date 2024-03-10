<template>
  <v-container class="mb-6">
    <v-row align="start" no-gutters>
      <v-col cols="4" v-for="product in products.homeProducts" :key="product.id">
        <v-container fluid class="text-center">
          <div>
            <v-img
              :src="`http://localhost:8000/images/catalog/320x320.png`"
              :lazy-src="`http://localhost:8000/images/catalog/320x320.png`"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2 rounded-image"
              height="auto"
              max-height="320"
              width="auto"
              max-width="320"
            >
              <template v-slot:placeholder> </template>
            </v-img>

            <p class="mt-2 text-description" style="font-size: 14px">{{ product.name }} {{ 1 }}</p>
            <div class="mt-1">
              <p class="text-center">
                <span class="price-bold" style="font-size: 18px">USD {{ product.price }}</span>
              </p>
            </div>
            <v-btn color="primary" class="mt-1" font-size="16px" block>
              <a
                v-on:click.prevent="onAddToCart(product.id)"
                class="btn btn-primary"
                style="color: white; text-decoration: none"
              >
                Add to cart
              </a>
            </v-btn>
          </div>
          <v-snackbar v-model="snackbar" multi-line>
            {{ snackbarMessage }}
            <template v-slot:actions>
              <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
            </template>
          </v-snackbar>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row no-gutters>
      <v-col class="col1 d-flex justify-end mr-10">
        <p><a href="#">Back to top</a></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Footer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cartStore'

import Footer from '@/components/frontoffice/partials/EcommerceFooter.vue'
import type { IApiProductCardsResponse } from '@app/frontoffice/catalog/domain/interfaces/IApiProductCardsResponse'
import GetProductCardListService from '@app/frontoffice/catalog/application/find/GetProductsCardListService'
import CartProductCreatorService from '@app/frontoffice/cart/application/create/CartProductCreatorService'
import ErrorHandlingService from '@app/shared/application/ErrorHandlingService'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import ApiErrorHandler from '@app/frontoffice/shared/application/errors/ApiErrorHandlerService'

const cartStore = useCartStore()
const errorRedirectService = new ErrorRedirectService()
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0)
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0)

const products = ref<IApiProductCardsResponse>({
  title: '',
  homeProducts: []
})

const errorHandling = new ErrorHandlingService()

let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

axios.defaults.withCredentials = true

onMounted(async () => {
  try {
    await getCartData()
    await getProductCardsList()

    cartStore.refreshQty(cartTotalItemCount.value)
    cartStore.refreshTotalAmountCart(cartTotalAmount.value)
    cartStore.showCollapsed(true)
  } catch (error: any) {
    errorHandling.handleApiError(error)
  }
})

const getProductCardsList = async (): Promise<void> => {
  try {
    const getProductCardList = new GetProductCardListService()
    const productCardList: IApiProductCardsResponse = await getProductCardList.getApiResponse()
    products.value = productCardList
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
      snackbarMessage.value = error.response.data.message
      snackbar.value = true
    }
  }
}

const productQty: number = 1

const onAddToCart = async (productId: string) => {
  try {
    const cartProductCreatorService = new CartProductCreatorService(productId, productQty)
    await cartProductCreatorService.create()
    await getCartData()
    cartStore.refreshQty(cartTotalItemCount.value)
    cartStore.refreshTotalAmountCart(cartTotalAmount.value)
  } catch (error) {
    errorHandling.handleApiError(error)
  }
}

const getCartData = async (): Promise<void> => {
  try {
    const getCartProducts = new CartProductsGetterService()
    const response = await getCartProducts.getCartProductsList()

    cartTotalItemCount.value = response.cartTotalItemCount
    cartTotalAmount.value = response.cartTotalAmount
    cartStore.refreshCartItems(response.sessionCartItems)
  } catch (error) {
    console.log(error)
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
