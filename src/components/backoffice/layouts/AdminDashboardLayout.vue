<template>
  <v-layout class="rounded rounded-md">
    <Navbar />
    <LeftNavigationDrawer />
    <MainOverview />
    <AdminFooter />
  </v-layout>
</template>

<script lang="ts" setup>
  import Navbar from '@/components/backoffice/partials/MainAdminNavbar.vue';
  import AdminFooter from '@/components/backoffice/partials/AdminFooter.vue';
  import LeftNavigationDrawer from '../partials/LeftNavigationDrawer.vue';
  import MainOverview from '@/components/backoffice/mainOverview/MainOverview.vue';
</script>

<style lang="scss" scoped>


</style>

