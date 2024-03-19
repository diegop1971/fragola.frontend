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
import { ref, onMounted } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true

import type { ICreateCheckout } from '@app/frontoffice/checkout/domain/interfaces/ICreateCheckout'
import type { IPaymentMethod } from '@app/frontoffice/checkout/domain/interfaces/IPaymentMethod'
import ErrorRedirectService from '@app/shared/application/ErrorRedirectService'
import GetPaymentMethodsService from '@app/frontoffice/checkout/application/find/GetPaymentMethodsService'
import CheckoutCartService from '@app/frontoffice/checkout/application/store/CheckoutCartService'
import ApiErrorHandler from '@app/backoffice/shared/application/errors/ApiErrorHandlerService'

const currentStep = ref(1)
const form = ref<HTMLFormElement | null>(null)
const errorRedirectService = new ErrorRedirectService()

const paymentMethodNamesWithIds = ref<IPaymentMethod[]>([])
const selectedPaymentMethod = ref<string>('')

const reactivePaymentMethodsData = ref<ICreateCheckout>({
  customer_id: '',
  payment_method_id: '',
  order_status_id: '',
  total_paid: 0,
  payment_method_name: ''
})

const idPaymentMethod = ref()

onMounted(async () => {
  await getData()
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

const getData = async (): Promise<void> => {
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

const checkout = async () => {
  const storeCheckoutCart = new CheckoutCartService(
    selectedPaymentMethod.value,
  )
  storeCheckoutCart.store()
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
