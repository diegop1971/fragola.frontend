import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { ISessionCartItem } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem'

export const useCartStore = defineStore('cartStore', () => {
  const cartItemCount = ref(0)
  const totalCartValue = ref(0)
  const cartItemsList: Ref<Array<ISessionCartItem>> = ref([])
  const collapsedState: Ref<boolean> = ref(true)

  function refreshQty(value: number) {
    cartItemCount.value = value
  }

  function refreshTotalCartValue(totalAmount: number) {
    totalCartValue.value = totalAmount
  }

  function refreshCartItems(cartItems: Array<ISessionCartItem>) {
    cartItemsList.value = cartItems
  }

  function showCollapsed(state: boolean) {
    collapsedState.value = state
  }

  function incrementBy(value: number) {
    cartItemCount.value += value
  }

  function decrementBy(value: number) {
    cartItemCount.value -= value
  }

  return {
    cartItemCount,
    totalCartValue,
    cartItemsList,
    collapsedState,
    refreshQty,
    refreshTotalCartValue,
    refreshCartItems,
    showCollapsed,
    incrementBy,
    decrementBy
  }
})
