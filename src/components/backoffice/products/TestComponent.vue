<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card color="basil">        
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
              <v-tab v-for="item in items" :key="item" :value="item">
                {{ item }}
              </v-tab>
            </v-tabs>
        
            <v-card>
              <v-card-text>
                <component :is="selectedTabComponent" v-bind="tabProps" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  // Importa los servicios y componentes necesarios
  //import AppetizersService from '@/services/AppetizersService';
  //import EntreesService from '@/services/EntreesService';
  // Importa y registra los componentes para otras pestañas
  import AppetizersComponent from '@/components/backoffice/products/AppetizersComponent.vue';
  import EntreesComponent from '@/components/backoffice/products/EntreesComponent.vue';
  // ... Importa otros componentes y servicios necesarios
  
  const tab = ref('Appetizers');
  const items = ['Appetizers', 'Entrees', 'Desserts', 'Cocktails'];
  let selectedTabComponent = AppetizersComponent; // Componente inicial para la pestaña 'Appetizers'
  let tabProps = {};
  
  watch(tab, (newTab) => {
    // Cambia dinámicamente el componente basado en la pestaña seleccionada
    switch (newTab) {
      case 'Appetizers':
        selectedTabComponent = AppetizersComponent;
        break;
      case 'Entrees':
        selectedTabComponent = EntreesComponent;
        break;
      // Agrega casos para otras pestañas si es necesario
    }
  });
  </script>
  
  <style>
  /* Estilos necesarios */
  </style>
  