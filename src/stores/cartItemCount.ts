import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartItemCountStore = defineStore('cartItemCount', () => {

    const counter = ref(0);
    const totalAmountCart = ref(0);

    function refreshQty(value: number) {
        counter.value = value
    }

    function refreshTotalAmountCart(totalAmount: number) {
        totalAmountCart.value = totalAmount;
    }
    
    function incrementBy(value: number) {
        counter.value += value;
    }

    function decrementBy(value: number) {
        counter.value -= value;
    }

    return { counter, totalAmountCart, refreshQty, refreshTotalAmountCart, incrementBy, decrementBy }
})