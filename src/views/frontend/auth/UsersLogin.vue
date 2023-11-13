<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="onLogin">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
            <div class="form-floating">
                <input v-model="form.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
                <label for="floatingInput">Email address</label>
            </div>
            
            <div class="form-floating">
                <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
            </div>
            
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            
            <div>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import axios from 'axios';
    import LoginService from '@app/frontoffice/auth/application/LoginService';
    import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';

    axios.defaults.withCredentials = true;

    const form = ref({
        email: "",
        password: "",
    });

    const errorHandling = new ErrorHandlingService();

    async function onLogin() {
        try {
            let email = form.value.email;
            let password = form.value.password;
            
            const loginService = new LoginService(email, password);
            const loginData = await loginService.getLoginData();
            console.log(loginData.data?.email);
        } catch (error: any) {
            let errorData;
            errorData = await errorHandling.handleApiError(error);
            console.error(errorData);
        }
    }
</script>

<style scoped>
    @import '@/assets/css/sign-in.css';
</style>
