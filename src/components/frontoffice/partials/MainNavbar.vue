<template>
  <v-app-bar class="custom-app-bar" style="position: static !important">
    <v-container class="navbar-container">
      <v-app-bar-title>
        <img :src="logoFragola" alt="Logo" height="60" width="93" />
      </v-app-bar-title>
      <router-link :to="{ name: 'home' }" class="text-decoration-none text-light">
        Home
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
import { onMounted } from 'vue'
import { watch } from 'vue'
import LogoutService from '@app/frontoffice/auth/application/LogoutService'
import NavbarCartButton from '@/components/frontoffice/partials/NavbarCartButton.vue'
import { useCartStore } from '@/stores/cartStore'
import logoFragola from '@/assets/brand/logo-fragola-93-60.png'

const cartStore = useCartStore()
const isButtonDisabled = ref(false)

onMounted(async () => {
  if (cartStore.cartItemCount === 0) {
    isButtonDisabled.value = true
  }
})

watch(
  () => cartStore.cartItemCount,
  (newState) => {
    isButtonDisabled.value = newState === 0
  }
)

async function onLogout() {
  try {
    new LogoutService()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1500px;
  padding: 0 !important;
}

.custom-app-bar {
  height: 60px;
}
</style>
