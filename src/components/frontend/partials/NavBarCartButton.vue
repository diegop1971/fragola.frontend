<template>
    <button class="btn btn-secondary" type="submit">
        <i class="bi-cart-fill me-1"></i>
        <span class="text-white ms-1 square-pill">{{ cartItemCountStore.counter }}</span>
    </button>
</template>

<script setup lang="ts">
    import { useCartItemCountStore } from '@/stores/cartItemCount.ts';
    const cartItemCountStore = useCartItemCountStore();
</script>