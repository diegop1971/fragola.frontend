<template>
    <v-app-bar>
        <v-app-bar-title>Admin Panel</v-app-bar-title>
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