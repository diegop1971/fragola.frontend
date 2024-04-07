<script setup lang="ts">
import { computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import NumberFormatterService from '@app/shared/application/NumberFormatterService'
import { useCartStore } from '@/stores/cartStore'
import { defineProps } from 'vue'

const router = useRouter()
const cartStore = useCartStore()

axios.defaults.withCredentials = true

const formatNumber = (numberToFormat: number) => {
  return computed(() => {
    let formatter = new NumberFormatterService()
    return formatter.formatNumber(numberToFormat)
  })
}

defineProps({
  showButton: {
    type: Boolean,
    default: true
  }
})

const checkout = async () => {
  if (cartStore.cartItemCount > 0) {
    //revisar si router.push es conveniente
    router.push({ name: 'checkout-cart' })
  }
}
</script>

<template>
  <div class="checkout-container summary-container">
    <div class="summary-container">
      <h4 class="order-summary-title">Order summary</h4>
      <hr class="separator-line" />
      <div class="summary-item">
        <div>Number of items:</div>
        <div>{{ cartStore.cartItemCount }}</div>
      </div>
      <div class="summary-item">
        <div>Total items:</div>
        <div>U$S {{ formatNumber(cartStore.totalCartValue) }}</div>
      </div>
      <div class="summary-item">
        <div>Discounts:</div>
        <div>U$S 0.00</div>
      </div>
      <hr class="separator-line" />
      <div class="summary-item order-total">
        <div>Total to pay:</div>
        <div>U$S {{ formatNumber(cartStore.totalCartValue) }}</div>
      </div>
      <div class="checkout-button-container" v-if="showButton">
        <v-btn class="mt-4" block @click="checkout" :disabled="!cartStore.cartItemCount">
          Checkout
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-container.summary-container {
  width: 400px;
  max-width: 400px;
  background-color: #f8f9fa; /* Color de fondo */
  border: 1px solid #ced4da; /* Borde */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  font-family: 'Arial', sans-serif; /* Tipo de letra */
  height: 403px;
  font-family: 'Roboto', sans-serif;

  .order-summary-title {
    color: #020202; /* Color del título */
    font-size: 1rem; /* Tamaño del título */
  }

  .summary-item {
    display: flex; /* Alineación de los elementos */
    justify-content: space-between; /* Espaciado entre los elementos */
    margin-bottom: 10px; /* Espaciado debajo de cada elemento */
    font-size: 1rem;
    font-weight: 400;
  }

  .order-total {
    font-weight: 600;
  }

  .checkout-button-container {
    text-align: center; /* Centrado del botón */
  }

  .checkout-button-container button {
    background-color: #000000; /* Color de fondo del botón */
    color: #fff; /* Color del texto del botón */
    padding: 10px 20px; /* Espaciado interno del botón */
    border-radius: 5px; /* Bordes redondeados del botón */
    cursor: pointer; /* Cursor del botón */
    font-size: 1.2rem; /* Tamaño del texto del botón */
  }

  .separator-line {
    border: 0;
    height: 1px;
    background-color: #b9b6b6; /* Color gris */
    margin: 10px 0; /* Margen superior e inferior */
  }
}
</style>
