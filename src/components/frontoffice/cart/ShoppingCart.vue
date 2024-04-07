<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartPartial from '@/components/frontoffice/cart/CartPartial.vue'
import CartSummaryPartial from '@/components/frontoffice/shared/CartSummaryPartial.vue'

const cartStore = useCartStore()
let showContent = ref(0)

onMounted(async () => {
  const counter = localStorage.getItem('counter')
  cartStore.refreshQty(Number(counter))
  showContent.value = cartStore.counter
})

watch(
  () => cartStore.counter,
  (newCounter) => {
    showContent.value = newCounter
  }
)

watch(
  () => showContent,
  (newShowContent) => {
    console.log('watch newShowContent:', newShowContent)
  }
)
</script>

<template>
  <v-container class="cart-checkout-container">
    <div class="flex-container">
      <template v-if="showContent > 0">
        <CartPartial />
        <CartSummaryPartial :showButton="true" />
      </template>
      <template v-else>
        <h1>Tu carrito está vacío!!!</h1>
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
