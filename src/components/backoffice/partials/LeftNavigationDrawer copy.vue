
<template>
    <v-app-bar>
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <router-link :to="{ name: 'home' }" class="text-decoration-none text-light">
            Home
        </router-link>
        <router-link :to="{ name: 'cart' }" class="text-decoration-none text-light">
            <v-btn class="v-btn--contained">
                Cart
            </v-btn>
        </router-link>
        <v-btn outlined>
            <NavbarCartButton />
        </v-btn>
        <router-link :to="{ name: 'login' }" class="text-decoration-none text-light">
            <v-btn>
                Login
            </v-btn>
        </router-link>
        <v-btn @click="onLogout" class="text-decoration-none text-light">
            Logout
        </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
    import LogoutService from '@app/frontoffice/auth/application/LogoutService';
    import NavbarCartButton from '@/components/frontoffice/partials/NavbarCartButton.vue'; 

    async function onLogout() {
        try {
            new LogoutService();
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style scoped>


</style>