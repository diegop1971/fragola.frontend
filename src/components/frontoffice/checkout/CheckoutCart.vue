<template>
  <v-container class="mb-6">
    <v-stepper alt-labels editable :items="['Step 1', 'Step 2', 'Step 3']">
      <template v-slot:item.1>
        <v-card title="Step One" flat>
          <v-select
            v-model="selectedPaymentMethod"
            label="Payment methods"
            :items="paymentMethodNamesWithIds"
            item-value="id"
            item-title="name"
            :rules="[(v) => !!v || 'Item is required']"
            :model="reactivePaymentMethodsData.payment_method_name"
            required
            @update:modelValue="onPaymentMethodChange"
            variant="outlined"
          ></v-select>

          <v-btn color="success" class="mt-4" block @click="checkout"> Guardar </v-btn>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Step Two" flat>...</v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true

import type { ICreateCheckout } from '@app/frontoffice/checkout/domain/interfaces/ICreateCheckout'
import type { IPaymentMethod } from '@app/frontoffice/checkout/domain/interfaces/IPaymentMethod'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import GetPaymentMethodsService from '@app/frontoffice/checkout/application/find/GetPaymentMethodsService'
import CheckoutCartService from '@app/frontoffice/checkout/application/store/CheckoutCartService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'
import { useCartStore } from '@/stores/cartStore'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import type { ISessionCartItem } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'

const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([])
const cartStore = useCartStore()
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0)
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0)
const currentStep = ref(1)
const form = ref<HTMLFormElement | null>(null)
const errorRedirectService = new ErrorRedirectService()

const paymentMethodNamesWithIds = ref<IPaymentMethod[]>([])
const selectedPaymentMethod = ref<string>('')

let cartData: ISessionCartItemResponse = {
  sessionCartItems: [],
  cartTotalItemCount: 0,
  cartTotalAmount: 0
}

const reactivePaymentMethodsData = ref<ICreateCheckout>({
  customer_id: '',
  payment_method_id: '',
  order_status_id: '',
  total_paid: 0,
  payment_method_name: ''
})

const idPaymentMethod = ref()

onMounted(async () => {
  await getPaymentMethods()
})

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
/**
 * customer_id => ya está en el backend??
 * payment_method_id => ok
 * order_status_id => ok
 * total_paid = en la variable cartData
 * order_id = se genera en el backend
 * product_id => en la variable cartData
 * quantity en la variable cartData
 * unit_price en la variable cartData
 */

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
      //snackbarMessage.value = error.response.data.message
      //snackbar.value = true
    }
  }
}

const getCartData = async (): Promise<ISessionCartItemResponse> => {
  const getCartData = new CartProductsGetterService()
  const cartData = await getCartData.getCartProductsList()
  return cartData
}

const checkout = async () => {
  try {
    const cartData = await getCartData()
    const storeCheckoutCart = new CheckoutCartService(selectedPaymentMethod.value, cartData)
    await storeCheckoutCart.store()
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK') {
      errorRedirectService.handleApiError(500)
    } else {
      const apiErrorHandler = new ApiErrorHandler()
      apiErrorHandler.handleError(error.response.data.code)
    }
  }
}

/*async function save() {
  if (form.value !== null) {
    const { valid } = await form.value.validate()

    if (valid) {
      const { payment_method_id } = reactivePaymentMethodsData.value

      const storeService = new StoreProductService(
        id,
        name,
        price,
        description,
        description_short,
        selectedCategory.value,
        low_stock_threshold,
        reactiveProductData.value.low_stock_alert,
        out_of_stock,
        reactiveProductData.value.enabled
      )
      try {
        storeResponse = await storeProductService.store()
        snackbarMessage.value = storeResponse.data.message
        snackbar.value = true

        if (storeResponse.data.success === true) {
          isSaveButtonDisabled.value = true

          setTimeout(() => {
            router.replace({ name: 'products' })
          }, 4000)
        }
      } catch (error: any) {
        //isSaveButtonDisabled.value = false
        if (error.code === 'ERR_NETWORK') {
          errorRedirectService.handleApiError(500)
        } else {
          const apiErrorHandler = new ApiErrorHandler()
          apiErrorHandler.handleError(error.response.data.code)
          //snackbarMessage.value = error.response.data.message
          //snackbar.value = true
        }
      }
    }
  }
}*/

const onPaymentMethodChange = (newSelectedPaymentMethod: string) => {
  selectedPaymentMethod.value = newSelectedPaymentMethod
}
</script>
