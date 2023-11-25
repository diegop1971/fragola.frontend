<template>
  <AdminDashboardLayout>
    <template v-slot:main-admin>
      <v-card>
        <v-card-title>
          <v-text-field label="Título del panel" v-model="title" ></v-text-field>
        </v-card-title>
        <v-card-text>
          <MainOverview />  
        </v-card-text>
      </v-card>
    </template>
  </AdminDashboardLayout>  
</template>
  
<script setup lang="ts">

  import AdminDashboardLayout from '@/components/backoffice/layouts/AdminDashboardLayout.vue';
  import MainOverview from '@/components/backoffice/mainOverview/MainOverview.vue';

  const title: string = 'Dashboard';

</script>
  