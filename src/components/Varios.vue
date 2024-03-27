<template>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div>
                    <h3>Login</h3>
                    <form @submit.prevent="onLogin">
                        <input v-model="form.email" type="email" placeholder="email" /><br />
                        <input v-model="form.password" type="password" placeholder="password" /><br />
                        <button>Submit</button>
                    </form>
                </div>
                <br />
                <div>
                    <button @click="onLogout">Cerrar sesión</button>
                </div>
                <br />
                <h3>Crear producto</h3>
                <div>
                    <form @submit.prevent="onCreateProduct">
                        <input v-model="formCreateProduct.name" type="text" placeholder="password" /><br />
                        <input v-model="formCreateProduct.description" type="text" placeholder="Descripcion" /><br />
                        <input v-model="formCreateProduct.descriptionShort" type="text" placeholder="Descripcion corta" /><br />
                        <button>Submit</button>
                    </form>
                </div>
                <br />
                <div>
                    <h3>Obtener usuario logueado</h3>
                    <button @click="onGetUser">Get user</button>
                </div>
                <br />
                <div>
                    <button @click="onGetProducts">Get Products</button>
                </div>
                <br />
                <div>
                    <button @click="onDeleteStockProduct">Delete Stock product</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import { Ref } from 'vue';
    import axios from 'axios';
    
    axios.defaults.withCredentials = true;
    //axios.defaults.baseURL = "http://localhost:8000/";

    const form = ref({
        email: "usuario.prueba@gmail.com ",
        password: "123456789",
    });

    const formCreateProduct = ref({
        id: "",
        name: "",
        description: "", 
        descriptionShort: "", 
        price: 0, 
        category_id: '',
        low_stock_threshold: 1,
        low_stock_alert: 1, 
        enabled: true,
    });

    const user = ref();

    interface LoginError extends Error {
        responseStatus: number;
    }

    async function onLogin() {
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie"); 

            const response = await axios.post("http://localhost:8000/login", {
                email: form.value.email,
                password: form.value.password,
            });
            user.value = null;
            console.log(response.data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const jsonData = error.response.data;
                console.log(jsonData.message);
            } else {
                console.error('No se pudo acceder al JSON en error.response.data');
            }
        }
    }

    async function onLogout() {
        try {
            const response = await axios.post("http://localhost:8000/logout");

            if (response.status === 204) {
                user.value = null;
                console.log("Sesión cerrada exitosamente.");
            } else {
                console.log(`Error al cerrar sesión: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function onGetUser() {
        let {data} = await axios.get("http://localhost:8000/api/user");
        user.value = data;
        console.log(user.value);
    }

    async function onGetProducts() {

        let products = await axios.get("http://localhost:8000/api/productsCardList");

        console.log(products);
    }

    async function onDeleteStockProduct() {

        const products = await axios.delete("http://localhost:8000/api/stock/3f70c254-576b-4fb0-9eb0-794287cf93c2");

        console.log(products);
    }

    async function onCreateProduct() {
        let uuid = self.crypto.randomUUID();

        const response = await axios.post("http://localhost:8000/api/products/store/", {
                id: uuid,
                name: formCreateProduct.value.name,
                description: formCreateProduct.description, 
                descriptionShort: formCreateProduct.descriptionShort, 
                price: 0, 
                category_id: '',
                low_stock_threshold: 1,
                low_stock_alert: 1, 
                enabled: true,
        });
    }

</script>
