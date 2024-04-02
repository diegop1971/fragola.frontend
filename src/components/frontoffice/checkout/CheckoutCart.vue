<template>
  <v-container class="cart-container">
    <v-row>
      <v-col cols="8">
        <v-stepper alt-labels editable :items="['Step 1', 'Step 2', 'Step 3']" style="width: 60%">
          <template v-slot:item.1>
            <v-form ref="form">
              <v-card title="Step One" flat>
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

                <v-btn color="success" class="mt-4" block @click="checkout"> Guardar </v-btn>
              </v-card>
            </v-form>
          </template>

          <template v-slot:item.2>
            <v-card title="Step Two" flat>...</v-card>
          </template>

          <template v-slot:item.3>
            <v-card title="Step Three" flat>...</v-card>
          </template>
        </v-stepper>
      </v-col>
      <v-col cols="4">
        <div class="d-flex align-center flex-column">
          <div class="text-subtitle-2">With props</div>

          <v-card
            subtitle="This is a subtitle"
            text="This is content"
            title="This is a title"
            width="400"
          ></v-card>

          <div class="mt-4 text-subtitle-2">With slots</div>

          <v-card width="400">
            <template v-slot:title> This is a title </template>

            <template v-slot:subtitle> This is a subtitle </template>

            <template v-slot:text> This is content </template>
          </v-card>

          <div class="mt-4 text-subtitle-2">With markup</div>

          <v-card width="400">
            <v-card-item>
              <v-card-title>This is a title</v-card-title>

              <v-card-subtitle>This is a subtitle</v-card-subtitle>
            </v-card-item>

            <v-card-text> This is content </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
import VuetifyValidationCheckoutFormService from '@app/frontoffice/checkout/rules/VuetifyValidationCheckoutFormService'
import { onBeforeMount } from 'vue'

const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([])
const cartStore = useCartStore()
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0)
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0)
const currentStep = ref(1)
const errorRedirectService = new ErrorRedirectService()

const router = useRouter()
const form = ref<HTMLFormElement | null>(null)
const customerEmail = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const paymentMethodNamesWithIds = ref<IPaymentMethod[]>([])
const selectedPaymentMethod = ref<string>('')

const users = [
  { id: 1, name: 'John Doe', phone: '555-1234', profession: 'Developer' },
  { id: 2, name: 'Jane Smith', phone: '555-5678', profession: 'Designer' }
  // Add more users as needed
]

/*let cartData: ISessionCartItemResponse = {
  sessionCartItems: [],
  cartTotalItemCount: 0,
  cartTotalAmount: 0
}*/

/*const reactivePaymentMethodsData = ref<ICreateCheckout>({
  customer_id: '',
  customer_email: '',
  payment_method_id: '',
  order_status_id: '',
  total_paid: 0,
  payment_method_name: ''
})*/

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
