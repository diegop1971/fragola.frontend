<template>
  <v-layout class="rounded rounded-md">
    
    <v-navigation-drawer>
      <LeftNavigationDrawer />
    </v-navigation-drawer>

    <Navbar />

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>

    <AdminFooter />

  </v-layout>
</template>

<script lang="ts" setup>
  import Navbar from '@/components/backoffice/partials/MainAdminNavbar.vue';
  import AdminFooter from '@/components/backoffice/partials/AdminFooter.vue';
  import LeftNavigationDrawer from '../partials/LeftNavigationDrawer.vue';

</script>

<style lang="scss" scoped>


</style>

