<script setup lang="ts">
import CartPartial from '@/components/frontoffice/cart/CartPartial.vue'
import CartSummaryPartial from '@/components/frontoffice/shared/CartSummaryPartial.vue'
</script>

<template>
  <v-container class="cart-checkout-container">
    <div class="flex-container">
      <CartPartial />
      <CartSummaryPartial :showButton="true" />
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.cart-checkout-container {
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
