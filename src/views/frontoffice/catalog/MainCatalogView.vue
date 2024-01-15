<template>
  <MainLayout>
    <template v-slot:main>
      <v-container>
        <section class="py-5">
          <ProductCards />
        </section>
      </v-container>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/frontoffice/layouts/MainLayout.vue'
import ProductCards from '@/components/frontoffice/catalog/partials/ProductCards.vue'
</script>
