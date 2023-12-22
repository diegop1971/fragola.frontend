import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { ISessionCartItem}  from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem'; 

export const useCartStore = defineStore('cartStore', () => {

    const counter = ref(0);
    const totalAmountCart = ref(0);
    const cartItemsList: Ref<Array<ISessionCartItem>> = ref([]);
    const collapsedState: Ref<boolean> = ref(true);

    function refreshQty(value: number) {
        counter.value = value
    }

    function refreshTotalAmountCart(totalAmount: number) {
        totalAmountCart.value = totalAmount;
    }

    function refreshCartItems(cartItems: Array<ISessionCartItem>) {
        cartItemsList.value = cartItems;
      }

    function showCollapsed(state: boolean) {
        collapsedState.value = state;
    }

    function incrementBy(value: number) {
        counter.value += value;
    }

    function decrementBy(value: number) {
        counter.value -= value;
    }

    return { counter, totalAmountCart, cartItemsList, collapsedState, refreshQty, refreshTotalAmountCart, refreshCartItems, showCollapsed, incrementBy, decrementBy }
})