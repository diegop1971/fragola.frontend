<template>
    <header data-bs-theme="dark">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-5">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Carousel</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'home' }" class="nav-link active" aria-current="page">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'cart' }" class="nav-link">Cart</RouterLink>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-md-0">
                        <li class="navbar-nav ms-auto mb-5 mb-md-0 me-5">
                            <NavbarCartButton />
                        </li>
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'login' }" class="nav-link active" aria-current="page">Login</RouterLink>
                        </li>
                        <li class="nav-item">
                            <a @click="onLogout" class="nav-link">Logout</a>
                        </li>
                        <li class="nav-item">
                            <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
    import LogoutService from '@app/frontoffice/auth/LogoutService';
    import NavbarCartButton from '@/components/frontend/partials/NavbarCartButton.vue'; 

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