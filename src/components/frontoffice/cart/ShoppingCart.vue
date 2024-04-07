<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartPartial from '@/components/frontoffice/cart/CartPartial.vue'
import CartSummaryPartial from '@/components/frontoffice/shared/CartSummaryPartial.vue'

const cartStore = useCartStore()

onMounted(async () => {
  const cartItemCount = localStorage.getItem('cartItemCount')
  cartStore.refreshQty(Number(cartItemCount))
})
</script>

<template>
  <v-container class="cart-checkout-container">
    <div class="flex-container">
      <template v-if="cartStore.cartItemCount > 0">
        <CartPartial />
        <CartSummaryPartial :showButton="true" />
      </template>
      <template v-else>
        <h1>Your cart is empty</h1>
      </template>
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
