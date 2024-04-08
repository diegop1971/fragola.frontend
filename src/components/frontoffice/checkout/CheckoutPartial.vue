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
import CheckoutCartService from '@app/frontoffice/checkout/application/store/CheckoutCartService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import { useCartStore } from '@/stores/cartStore'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'
import VuetifyValidationCheckoutFormService from '@app/frontoffice/checkout/rules/VuetifyValidationCheckoutFormService'
import { onBeforeMount } from 'vue'

const cartStore = useCartStore()
const errorRedirectService = new ErrorRedirectService()

const router = useRouter()
const form = ref<HTMLFormElement | null>(null)
const customerEmail = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const paymentMethodNamesWithIds = ref<IPaymentMethod[]>([])
const selectedPaymentMethod = ref<string>('')
let snackbar: Ref<boolean> = ref(false)
let snackbarMessage: Ref<string> = ref('')
const emailRules = [(v: string) => validateCheckoutRuleEmail(v)]
const nameRules = [(v: string) => validateCheckoutRuleName(v)]

const validateCheckoutRuleEmail = async (value: string): Promise<string | boolean> => {
  const validationResult = VuetifyValidationCheckoutFormService.validateRuleEmail(value)
  return validationResult
}

const validateCheckoutRuleName = async (value: string): Promise<string | boolean> => {
  const validationResult = VuetifyValidationCheckoutFormService.validateName(value)
  return validationResult
}

onBeforeMount(async () => {
  let cart = await getCartData()
  if (cart['cartTotalItemCount'] === 0) {
    router.push('/cart')
  }
})

onMounted(async () => {
  await getPaymentMethods()
  if (Object.keys(cartStore.cartItemsList).length === 0) {
    refreshCartStore()
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

const checkout = async () => {
  if (form.value !== null) {
    const { valid } = await form.value.validate()
    if (valid) {
      try {
        const cartData = await getCartData()
        const storeCheckoutCart = new CheckoutCartService(
          customerEmail.value,
          firstName.value,
          lastName.value,
          selectedPaymentMethod.value,
          cartData
        )
        let checkoutResponse = await storeCheckoutCart.store()
        if (checkoutResponse.data.success) {
          refreshCartStore()
          cartStore.refreshQty(0)
          cartStore.refreshTotalCartValue(0)
          cartStore.refreshIsCheckoutSuccessAccessible(true)
          router.push('/checkout-success')
        }
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
  }
}

const refreshCartStore = async () => {
  let cartData = await getCartData()
  cartStore.refreshTotalCartValue(cartData.cartTotalAmount)
  cartStore.refreshQty(cartData.cartTotalItemCount)
}

const onPaymentMethodChange = (newSelectedPaymentMethod: string) => {
  selectedPaymentMethod.value = newSelectedPaymentMethod
}
</script>

<template>
  <div class="checkout-container">
    <v-card style="width: 100%" class="no-shadow rounded-card padded-card">
      <h2>Checkout</h2>
      <v-form ref="form" style="width: 100%">
        <v-text-field
          label="Email"
          type="email"
          required
          v-model="customerEmail"
          :rules="emailRules"
          outlined
        ></v-text-field>
        <v-text-field
          label="First name"
          required
          v-model="firstName"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          label="Last name"
          required
          v-model="lastName"
          :rules="nameRules"
        ></v-text-field>
        <v-select
          v-model="selectedPaymentMethod"
          label="Payment methods"
          :items="paymentMethodNamesWithIds"
          item-value="id"
          item-title="name"
          :rules="[(v) => !!v || 'Item is required']"
          required
          @update:modelValue="onPaymentMethodChange"
          variant="outlined"
        ></v-select>

        <v-btn color="success" class="mt-4" block @click="checkout"> Confirm order </v-btn>
      </v-form>
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
