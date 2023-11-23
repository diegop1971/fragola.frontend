<template>
    <AdminDashboardLayout>
      <template v-slot:main-admin>
        <MainOverview />  
      </template>
    </AdminDashboardLayout>  
  </template>
  
  <script setup lang="ts">
    import AdminDashboardLayout from '@/components/backoffice/layouts/AdminDashboardLayout.vue';
    import MainOverview from '@/components/backoffice/mainOverview/MainOverview.vue';
  </script>
  