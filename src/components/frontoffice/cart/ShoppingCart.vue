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
            <tr v-if="sessionCartItems.length === 0">
                <td colspan="6" class="text-center">
                    <h3>Tu carrito está vacío</h3>
                </td>
            </tr>
            <tr v-else v-for="(sessionCartItem, key) in sessionCartItems" v-bind:key="sessionCartItem.productId">
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
                <td class="text-right">Total:</td>
                <td class="text-right">$ {{ totalGeneral() }}</td>
                <td></td>
            </tr>
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

import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';
import NumberFormatterService from '@app/shared/application/NumberFormatterService';
import CartProductRemoverService from '@app/frontoffice/cart/application/delete/CartProductRemoverService';
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService';
import type { ISessionCartItem}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem';
import { useCartStore } from '@/stores/cartStore';
import CartProductQuantityUpdaterService from '@app/frontoffice/cart/application/update/CartProductQuantityUpdaterService';
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse';

const errorHandling = new ErrorHandlingService();
const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([]);
const visible = ref(false);

const cartStore = useCartStore();
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0);
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0);

axios.defaults.withCredentials = true;

onMounted(async (): Promise<void> => {
    try {
        await getCartData();
        let cant = await cantItems();
        await cartStore.refreshQty(cant);
        cartStore.refreshTotalAmountCart(cartTotalAmount.value);
        cartStore.showCollapsed(false);
    } catch (error: any) {
        errorHandling.handleApiError(error);
    }
});

const onDeleteItem = async (index: number):Promise<void> => {
    try {
        const cartItemRemover = await new CartProductRemoverService(index);
        await cartItemRemover.delete();
        await getCartData();
        cartStore.refreshQty(cartTotalItemCount.value);
        cartStore.refreshTotalAmountCart(cartTotalAmount.value);
    }catch(error){
        console.log(error);
    }
}

const getProductUnitPrice = computed(() => {
    return (sessionCartItem: ISessionCartItem) => {
        return onFormatNumber(sessionCartItem.productUnitPrice);
    };
});

const onFormatNumber = (numberToFormat: number) => {
    let formattedNumber = new NumberFormatterService();
    return formattedNumber.formatNumber(numberToFormat);
};

const getCartData = async (): Promise<void> => {
    try {
        const getCartProducts = new CartProductsGetterService();
        const response = await getCartProducts.getCartProductsList();

        sessionCartItems.value = response.sessionCartItems.map(
            item => ({
            productId: item.productId,
            productName: item.productName,
            productQty: item.productQty,
            productUnitPrice: item.productUnitPrice,
            subtotal: item.productQty * item.productUnitPrice, 
        }));
        cartTotalItemCount.value = response.cartTotalItemCount;
        cartTotalAmount.value = response.cartTotalAmount;
        cartStore.refreshCartItems(response.sessionCartItems);
    } catch(error) {
        errorHandling.handleApiError(error);
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
    await cantItems();
    cartStore.refreshQty(cartTotalItemCount.value);
    cartStore.refreshTotalAmountCart(cartTotalAmount.value);
}

const decrement = async (sessionCartItem: ISessionCartItem) => {
    if (sessionCartItem.productQty > 1) {
        sessionCartItem.productQty--;
        await modifyCartItemQuantity(sessionCartItem.productId, sessionCartItem.productQty);
        await cantItems();
        cartStore.refreshQty(cartTotalItemCount.value);
        cartStore.refreshTotalAmountCart(cartTotalAmount.value);
    }
}

const modifyCartItemQuantity = async (productId: string, productQty: number) => {
    try {
        const updateCartItemQuantity = new CartProductQuantityUpdaterService(productId, productQty);
        await updateCartItemQuantity.update();
        await getCartData();
    } catch (error) {
        console.log(error);
    }
}
</script>