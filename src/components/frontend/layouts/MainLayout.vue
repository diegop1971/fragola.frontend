<template>
    <Navbar/>
    <slot name="main"></slot>
</template>

<script setup lang="ts">
  import Navbar from '@/components/frontend/partials/Navbar.vue'; 
</script>
