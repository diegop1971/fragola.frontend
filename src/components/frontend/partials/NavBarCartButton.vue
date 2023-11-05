<template>
    <button class="btn btn-secondary" type="submit">
        <i class="bi-cart-fill me-1"></i>
        <span class="text-white ms-1 square-pill">{{ cartItemCountStore.counter }} - {{ formatTotalCartAmount(cartItemCountStore.totalAmountCart) }}</span>
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useCartItemCountStore } from '@/stores/cartItemCount';
    import NumberFormatterService from '@app/shared/application/NumberFormatterService';

    const cartItemCountStore = useCartItemCountStore();

    const formatTotalCartAmount = computed(() =>{
        return (numero: number) => {
            const numberFormater = new NumberFormatterService;
            const numberFormated = numberFormater.formatNumber(numero);
            return numberFormated;
        };
    })
</script>