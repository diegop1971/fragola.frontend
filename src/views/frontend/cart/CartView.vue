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
    import MainLayout from '@/components/frontend/layouts/mainLayout.vue';
    import Cart from '@/components/frontend/cart/Cart.vue';
</script>

