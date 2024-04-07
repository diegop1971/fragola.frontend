<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

axios.defaults.withCredentials = true

import type { IPaymentMethod } from '@app/frontoffice/checkout/domain/interfaces/IPaymentMethod'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import GetPaymentMethodsService from '@app/frontoffice/checkout/application/find/GetPaymentMethodsService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import { useCartStore } from '@/stores/cartStore'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'
import { onBeforeMount } from 'vue'

const cartStore = useCartStore()
const errorRedirectService = new ErrorRedirectService()

const router = useRouter()
const paymentMethodNamesWithIds = ref<IPaymentMethod[]>([])
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')

onBeforeMount(async () => {
  let cart = await getCartData()
  console.log('onBeforeMount: ', cart['cartTotalItemCount'])
  if (cart['cartTotalItemCount'] === 0) {
    router.push('/cart')
  }
})

onMounted(async () => {
  await getPaymentMethods()
  //if (Object.keys(cartStore.cartItemsList).length === 0) {
  if (cartStore.cartItemCount === 0) {
    let cartData = await getCartData()
    cartStore.refreshTotalCartValue(cartData.cartTotalAmount)
    cartStore.refreshQty(cartData.cartTotalItemCount)
  }
})

const getPaymentMethods = async (): Promise<void> => {
  try {
    const getPaymentMethodsService = new GetPaymentMethodsService()
    const response = await getPaymentMethodsService.getApiResponse()
    const { paymentMethodsList } = response

    paymentMethodNamesWithIds.value = paymentMethodsList.map((paymentMethod: IPaymentMethod) => ({
      id: paymentMethod.id,
      name: paymentMethod.name
    }))
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

const getCartData = async (): Promise<ISessionCartItemResponse> => {
  const getCartData = new CartProductsGetterService()
  const cartData = await getCartData.getCartProductsList()
  return cartData
}
</script>

<template>
  <div class="checkout-container">
    <v-card style="width: 100%" class="no-shadow rounded-card padded-card">
      <h2>Your order has been placed!</h2>
      <span
        >Your order has been successfully processed! Please direct any questions you have to the
        store owner</span
      >
      <span>Thanks for shopping with us online!</span>
      <v-snackbar v-model="snackbar" multi-line>
        {{ snackbarMessage }}
        <template v-slot:actions>
          <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.checkout-container {
  width: 865px;
  max-width: 865px;
  padding: 0 !important;
  margin-right: 30px;
}

.no-shadow {
  border: 1px solid #c0c0c0;
  box-shadow: none;
}

.rounded-card {
  border-radius: 10px;
}

.padded-card {
  padding: 15px;
}
</style>
