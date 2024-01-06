<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert type="error">
          <h1>Error 500</h1>
          <p>Se ha producido un error interno del servidor.</p>
          <p>
            Por favor, inténtelo de nuevo más tarde o póngase en contacto con el administrador del
            sitio web.
          </p>
          <v-btn color="primary" @click="onRedirectToHome">Volver a la página principal</v-btn>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onRedirectToHome = () => {
  router.push('/admin')
}
</script>
