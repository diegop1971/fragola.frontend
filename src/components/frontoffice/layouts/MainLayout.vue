<template>
  <Navbar />
  <v-container>
    <slot name="main"></slot>
  </v-container>
</template>

<script setup lang="ts">
  import Navbar from '@/components/frontoffice/partials/MainNavbar.vue'; 
</script>
