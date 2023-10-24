import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartItemCountStore = defineStore('cartItemCount', () => {

    const counter = ref(0)

    const doubleCount = computed(() => count.value * 2)

    function refreshQty(value: number) {
        counter.value = value
    }
    
    function incrementBy(value: number) {
        counter.value += value;
    }

    function decrementBy(value: number) {
        counter.value -= value;
    }

    return { counter, doubleCount, refreshQty, incrementBy, decrementBy }
})