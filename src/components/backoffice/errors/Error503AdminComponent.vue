<template>
  <v-container
    style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center"
  >
    <v-row>
      <v-col>
        <v-container fill-height fluid d-flex flex-column align-center>
          <img :src="logoUrl" alt="Logo" style="margin: 0px;" />
          <div class="content-wrapper">
            <p>No se pudo establecer conexión con el servidor.</p>
            <v-btn color="primary" @click="onRedirectToHome">Volver a la página principal</v-btn>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const logoUrl = new URL('@/assets/brand/logo-fragola-93-60.png', import.meta.url).href
const onRedirectToHome = () => {
  router.push('/admin')
}
</script>

<style scoped>
.content-wrapper {
  position: relative; /* Allow content to be positioned relative to the logo */
  top: 0; /* Position content below the logo */
  width: 100%; /* Make content 100% wide */
  margin-left: auto; /* Center content horizontally */
  /* Align content with the logo */
  left: 50%; /* Center content horizontally */
  transform: translateX(-50%); /* Center content vertically */
}
</style>


