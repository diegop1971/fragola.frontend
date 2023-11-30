<template>
  <!-- Top Navbar -->
  <v-container class=" v-container-v-app-bar mb-6">
    <Navbar />
  </v-container>
  
  <v-container>
    <!-- Main Container -->
    <v-row class="justify-center align-center">
      <v-col cols="12">
        <v-row no-gutters class="justify-center">      
          <v-col class="col-v-navigation" cols="3">
            <v-card>
              <v-layout>
                <!-- Left Navigation Drawer -->
                <LeftNavigationDrawerVue />
              </v-layout>
            </v-card>
          </v-col>
          <v-col cols="9" margin="20">
            <!-- Main content -->
            <main class="main-content">
              <router-view></router-view>
            </main>
          </v-col>
          <!-- Footer -->
          <AdminFooter />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import Navbar from '@/components/backoffice/partials/MainAdminNavbar.vue';
  import AdminFooter from '@/components/backoffice/partials/AdminFooter.vue';
  import LeftNavigationDrawerVue from '../partials/LeftNavigationDrawer.vue';

</script>

<style lang="scss" scoped>
  .v-container-v-app-bar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-col.col-v-navigation {
    border-bottom-style: none;
  }
  .col-v-navigation > .v-card {
      box-shadow: none;
  }
</style>

