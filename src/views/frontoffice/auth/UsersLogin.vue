<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="onLogin">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
            <div class="form-floating">
                <input v-model="form.email" type="email" autocomplete="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
                <label for="floatingInput">Email address</label>
            </div>
            
            <div class="form-floating">
                <input v-model="form.password" type="password" autocomplete="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
            </div>
            
            <button class="btn btn-primary w-100 py-2" type="submit">Log in</button>
            
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            
            <div>
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import container from "@app/shared/infrastructure/inversifyServiceProvider/inversify.config";
    import { LoginService } from "@app/frontoffice/auth/application/LoginService";
    import ErrorHandlingService from "@app/shared/application/ErrorHandlingService";
    import type { IAuthRepository } from "@app/frontoffice/auth/domain/interfaces/IAuthRepository";
    import TYPES from "@app/shared/infrastructure/inversifyServiceProvider/types";

    const form = ref({
        email: "",
        password: "",
    });

    const errorHandling = new ErrorHandlingService();
    const authRepository = container.get<IAuthRepository>(TYPES.IAuthRepository);
    const loginService = new LoginService(authRepository);

    async function onLogin() {
        try {
            const loginData = await loginService.execute(
                form.value.email,
                form.value.password
            );
            console.log(loginData.data?.email);
        } catch (error: unknown) {
            const errorData = await errorHandling.handleApiError(error);
            console.error(errorData);
        }
    }
</script>

<style scoped>
    
</style>
