<script setup lang="ts">
import CheckoutSuccessPartial from '@/components/frontoffice/checkout-success/CheckoutSuccessPartial.vue'
import CartSummaryPartial from '@/components/frontoffice/shared/CartSummaryPartial.vue'
</script>

<template>
  <v-container class="checkout-cart-container">
    <div class="flex-container">
      <CheckoutSuccessPartial />
      <CartSummaryPartial :showButton="false" />
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.checkout-cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}
</style>
