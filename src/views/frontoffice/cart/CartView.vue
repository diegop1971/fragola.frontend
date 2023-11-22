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
    import MainLayout from '@/components/frontoffice/layouts/MainLayout.vue';
    import Cart from '@/components/frontoffice/cart/ShoppingCart.vue';
</script>

