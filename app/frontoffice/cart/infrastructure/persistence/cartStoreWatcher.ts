import { watch } from 'vue'

export default function useCartStoreWatcher(cartStore: any) {
  watch(
    () => cartStore.cartItemCount,
    (newCartItemCount) => {
      localStorage.setItem('cartItemCount', JSON.stringify(newCartItemCount))
    }
  )

  watch(
    () => cartStore.totalCartValue,
    (newTotalCartValue) => {
      localStorage.setItem('totalCartValue', JSON.stringify(newTotalCartValue))
    }
  )

  /*watch(
    () => cartStore.cartItemsList,
    (newCartItemsList) => {
      localStorage.setItem('cartItemsList', JSON.stringify(newCartItemsList))
    }
  )

  watch(
    () => cartStore.collapsedState,
    (newCollapsedState) => {
      localStorage.setItem('collapsedState', JSON.stringify(newCollapsedState))
    }
  )*/
}
