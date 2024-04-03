<template>
  <router-link :to="{ name: 'cart' }" style="text-decoration: none; color: inherit">
    <v-btn class="v-btn--contained">
      <v-icon> mdi-cart </v-icon>
      {{ cartStore.counter }} item(s) - $ {{ formatTotalCartAmount(cartStore.totalAmountCart) }}
    </v-btn>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import NumberFormatterService from '@app/shared/application/NumberFormatterService'

const cartStore = useCartStore()
const formatTotalCartAmount = computed(() => {
  return (numero: number) => {
    const numberFormater = new NumberFormatterService()
    const numberFormated = numberFormater.formatNumber(numero)
    return numberFormated
  }
})
</script>
