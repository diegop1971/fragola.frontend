<template>
  <v-app-bar class="custom-app-bar">
    <v-container class="product-container">
      <v-app-bar-title>
        <img :src="logoFragola" alt="Logo" height="60" width="93" />
      </v-app-bar-title>
      <router-link :to="{ name: 'home' }" class="text-decoration-none text-light">
        Home
      </router-link>
      <router-link :to="{ name: 'cart' }" class="text-decoration-none text-light">
        <v-btn class="v-btn--contained"> Cart </v-btn>
      </router-link>
      <v-btn :disabled="isButtonDisabled" outlined>
        <NavbarCartButton />
      </v-btn>
      <router-link :to="{ name: 'login' }" class="text-decoration-none text-light">
        <v-btn> Login </v-btn>
      </router-link>
      <v-btn @click="onLogout" class="text-decoration-none text-light"> Logout </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watch } from 'vue'
import LogoutService from '@app/frontoffice/auth/application/LogoutService'
import NavbarCartButton from '@/components/frontoffice/partials/NavbarCartButton.vue'
import { useCartStore } from '@/stores/cartStore'
import logoFragola from '@/assets/brand/logo-fragola-93-60.png'

const cartStore = useCartStore()
const isButtonDisabled = ref(false)

watch(() => cartStore.counter, (newState, oldState) => {
  isButtonDisabled.value = newState === 0
})

async function onLogout() {
  try {
    new LogoutService()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra horizontalmente los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  max-width: 1500px;
}

.custom-app-bar {
  height: 60px;
}

.v-app-bar-title img {
  margin-left: 10px; /* Ajusta el valor según tus necesidades */
}
</style>
