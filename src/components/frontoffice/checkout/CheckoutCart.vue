<template>
  <v-container class="mb-6">
    <v-stepper alt-labels editable :items="['Step 1', 'Step 2', 'Step 3']">
      <template v-slot:item.1>
        <v-card title="Step One" flat>
          <v-btn
                  color="success"
                  class="mt-4"
                  block
                  @click="checkout"
                >
                  Guardar
                </v-btn>
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

import CheckoutCartService from '@app/frontoffice/checkout/application/store/CheckoutCartService'

const currentStep = ref(1)

const idPaymentMethod = ref()

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

const checkout = async () => {
  const storeCheckoutCart = new CheckoutCartService('cash_on_delivery')
  storeCheckoutCart.store();
}
/*
case 'bank_transfer':
case 'wallet':
case 'cash_on_delivery':
*/
</script>
