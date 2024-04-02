<template>
  <MainNavbar />
  <v-container>
    <RouterView></RouterView>
  </v-container>
</template>

<script setup lang="ts">
  import MainNavbar from '@/components/frontoffice/partials/MainNavbar.vue'; 
</script>
