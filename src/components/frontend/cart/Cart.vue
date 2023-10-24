<template>
        <div class="col-11">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Total</th>
                    </tr>
            </thead>
            <tbody>
                <template v-if="sessionCartItems.length === 0" v-bind:value="sessionCartItems">
                    <h3>Tu carrito está vacío</h3>
                </template>
                <template v-else>
                    <tr v-for="(sessionCartItem, key) in sessionCartItems" v-bind:key="sessionCartItem.productId">
                        <th scope="row">1</th>
                        <td>{{ sessionCartItem.productName }}</td>
                        <td>
                            {{ sessionCartItem.productQty }}
                            <input type="number" v-model="sessionCartItem.productQty" v-if="visible" min="1">
                            <button @click="increment(sessionCartItem)">+</button>
                            <button @click="decrement(sessionCartItem)">-</button>
                        </td>
                        <td class="text-center">$ {{ getProductUnitPrice(sessionCartItem) }}</td>
                        <td class="text-right border-bottom"><p class="h6">$ {{ subtotal(sessionCartItem.productQty, sessionCartItem.productUnitPrice) }}</p></td>
                        <td>
                            <a href="cart.delete-item" v-on:click.prevent="onDeleteItem(key)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3"></td>
                        <td class="text-right">Total general:</td>
                        <td class="text-right">$ {{ totalGeneral() }}</td>
                        <td></td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import { computed } from 'vue';
    import { onMounted } from 'vue';
    import axios from 'axios';

    import NumberFormatterService from '@/services/shared/NumberFormatterService';
    import CartItemRemoverService from '@/services/cart/CartItemRemoverService';
    import ModifyCartItemQuantityService from '@/services/cart/ModifyCartItemQuantityService';
    import GetCartProductsService from '@/services/cart/GetCartProductsService';
    import type { ISessionCartItem}  from '@/interfaces/ISessionCartItem';

    import { useCartItemCountStore } from '@/stores/cartItemCount.ts';
    const cartItemCountStore = useCartItemCountStore();

    const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([]);
    const visible = ref(false);
    const productId = ref<string>('');
    const productQty = ref<number>(0);
    const productUnitPrice =ref<number>(0);

    axios.defaults.withCredentials = true;

    onMounted(async (): Promise<void> => {
        try {
            await getItems();
            let cant = await cantItems();
            await cartItemCountStore.refreshQty(cant);
        } catch(error) {
            console.log(error);
        }
    });

    const getProductUnitPrice = computed(() => {
        return (sessionCartItem) => {
            return onFormatNumber(sessionCartItem.productUnitPrice);
        };
    });

    const onFormatNumber = (numberToFormat: number) => {
        let formattedNumber = new NumberFormatterService();
        return formattedNumber.formatNumber(numberToFormat);
    };

    const onDeleteItem = async (index: string):Promise<void> => {
        try {
            const cartItemRemover = await new CartItemRemoverService(index);
            const response = await cartItemRemover.deleteCartItem();
            await getItems();
        }catch(error){
            console.log(error);
        }
    }

    const getItems = async (): Promise<void> => {
        try {
            const getCartProducts = new GetCartProductsService();
            const response = await getCartProducts.getProductsList();

            sessionCartItems.value = response.data.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productQty: item.productQty,
                productUnitPrice: item.productUnitPrice,
                subtotal: item.productQty * item.productUnitPrice, 
            }));
        } catch(error) {
            console.log(error);
        }
    }

    const cantItems = async () => {
       let cant = await sessionCartItems.value.reduce((cant, item) => cant + item.productQty, 0);
       return cant;
    }

    const subtotal = (qty: number, price: number):number => {
        let subtotal = qty * price;
        let subtotalFormated = onFormatNumber(subtotal);
        return subtotalFormated;
    }

    const totalGeneral = () => {
        let formattedTotal = sessionCartItems.value.reduce((total, item) => total + item.subtotal, 0);
        return onFormatNumber(formattedTotal);
    }

    const increment = async (sessionCartItem: ISessionCartItem) => {
        sessionCartItem.productQty += 1;
        await modifyCartItemQuantity(sessionCartItem.productId, sessionCartItem.productQty);
        let cant = await cantItems();
        cartItemCountStore.incrementBy(1);
    }

    const decrement = async (sessionCartItem: ISessionCartItem) => {
        if (sessionCartItem.productQty > 1) {
            sessionCartItem.productQty--;
            await modifyCartItemQuantity(sessionCartItem.productId, sessionCartItem.productQty);
            let cant = await cantItems();
            cartItemCountStore.decrementBy(1);
        }
    }

    const modifyCartItemQuantity = async (productId: string, productQty: number) => {
        try {
            const modifyCartItemQuantity = new ModifyCartItemQuantityService(productId, productQty);
            const response = await modifyCartItemQuantity.getModifyCartItemQuantity();
            await getItems();
        } catch (error) {
            console.log(error);
        }
    }
</script>
