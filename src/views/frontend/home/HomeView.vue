<template>
  <MainLayout>
    <template v-slot:main>
      <Carousel />
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
  import {ref} from 'vue';

  import MainLayout from '@/components/frontend/layouts/mainLayout.vue';
  import Carousel from '@/components/frontend/home/partials/Carousel.vue';
  import Footer from '@/components/frontend/partials/Footer.vue';
  import ProductCards from '@/components/frontend/home/partials/ProductCards.vue';

</script>
