<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToHome = async () => {
  router.push('/')
}
</script>

<template>
  <v-container class="checkout-cart-container">
    <v-card style="width: 100%" class="no-shadow rounded-card padded-card">
      <h1 class="title">Your order has been placed!</h1>
      <p class="paragraph">
        Your order has been successfully processed! Please direct any questions you have to the
        store owner
      </p>
      <p class="paragraph">Thanks for shopping with us online!</p>
      <v-btn class="continue-button" color="primary" @click="redirectToHome">Continue</v-btn>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.checkout-cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
  width: 1500px;
  max-width: 1500px;
  font-family: 'Roboto', sans-serif;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.no-shadow {
  border: 1px solid #c0c0c0;
  box-shadow: none;
}

.rounded-card {
  border-radius: 1px;
}

.padded-card {
  padding: 15px;
}

.title {
  font-size: 1.5em; /* Ajusta este valor según tus necesidades */
}

.paragraph {
  font-size: 1em; /* Ajusta este valor según tus necesidades */
}

.continue-button {
  float: right; /* Alinea el botón a la derecha */
}
</style>
