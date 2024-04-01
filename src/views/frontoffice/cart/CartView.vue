<template>
  <MainLayout>
    <template v-slot:main>
      <v-container>
        <section class="py-5">
          <Cart />
        </section>
      </v-container>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/frontoffice/layouts/MainLayout.vue'
import Cart from '@/components/frontoffice/cart/ShoppingCart.vue'
</script>
