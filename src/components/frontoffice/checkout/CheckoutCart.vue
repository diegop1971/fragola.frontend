<script setup lang="ts">
import CheckoutPartial from '@/components/frontoffice/checkout/CheckoutPartial.vue'
import CartSummaryPartial from '@/components/frontoffice/shared/CartSummaryPartial.vue'
</script>

<template>
  <v-container class="checkout-cart-container">
    <div class="flex-container">
      <CheckoutPartial />
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
