<template>
    <Navbar/>
    <slot name="main"></slot>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/frontend/partials/Navbar.vue'; 
</script>
