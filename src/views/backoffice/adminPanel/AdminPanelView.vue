<template>
  <v-layout class="rounded rounded-md" style="min-height: 1000px;">
    <Navbar />
    <LeftNavigationDrawer />
    <router-view></router-view>
    <AdminFooter />
  </v-layout>
</template>

<script lang="ts" setup>
  import Navbar from '@/components/backoffice/partials/MainAdminNavbar.vue';
  import AdminFooter from '@/components/backoffice/partials/AdminFooter.vue';
  import LeftNavigationDrawer from '@/components/backoffice/partials/LeftNavigationDrawer.vue';
</script>
