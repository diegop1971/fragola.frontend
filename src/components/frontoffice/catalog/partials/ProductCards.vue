<template>
  <v-container class="product-container">
    <v-card
      class="mx-auto my-2 product-card"
      max-width="350"
      elevation="4"
      v-for="product in products.homeProducts"
      :key="product.id"
    >
      <v-img height="350" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover></v-img>
      <v-card-text>
        {{ trimmedDescription(product.description) }}
        <div class="price" style="margin-top: 8px">USD {{ product.price }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple-lighten-2" variant="outlined" dark @click="onAddToCart(product.id)">
          Agregar al carrito
        </v-btn>
      </v-card-actions>
    </v-card>
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

function trimmedDescription(description: string): string {
  if (description.length <= 70) {
    return description
  }
  return description.substring(0, 70) + '...'
}

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
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1500px;
}

.rounded-image {
  border-radius: 4px;
}

.product-description {
  font-size: 14px;
}

.price {
  font-size: 16px;
  color: #1b5e20;
}

.text-description {
  color: #333;
}
</style>
