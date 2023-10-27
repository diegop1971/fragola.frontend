<template>
    <MainLayout>
        <template v-slot:main>
            <section class="py-5">
                <Cart />
            </section>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
    import MainLayout from '@/components/frontend/layouts/MainLayout.vue';
    import Cart from '@/components/frontend/cart/ShoppingCart.vue';
</script>

