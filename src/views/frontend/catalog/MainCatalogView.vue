<template>
  <MainLayout>
    <template v-slot:main>
      <v-container>
        <section class="py-5">
          <ProductCards />
        </section>
      </v-container>
      <Footer />
    </template>
  </MainLayout>  
</template>

<script setup lang="ts">
  import MainLayout from '@/components/frontend/layouts/MainLayout.vue'
  import Footer from '@/components/frontend/partials/Footer.vue';
  import ProductCards from '@/components/frontend/catalog/partials/ProductCards.vue';
</script>
