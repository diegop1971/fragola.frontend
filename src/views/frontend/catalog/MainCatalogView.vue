<template>
  <MainLayout>
    <template v-slot:main>
      <MainCarousel />
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <ProductCards />
        </div>
      </section>
      <Footer />
    </template>
  </MainLayout>  
</template>

<script setup lang="ts">
  import MainLayout from '@/components/frontend/layouts/MainLayout.vue'
  import MainCarousel from '@/components/frontend/catalog/partials/MainCarousel.vue';
  import Footer from '@/components/frontend/partials/Footer.vue';
  import ProductCards from '@/components/frontend/catalog/partials/ProductCards.vue';
</script>
