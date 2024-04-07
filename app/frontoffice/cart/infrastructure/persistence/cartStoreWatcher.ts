import { watch } from 'vue'

export default function useCartStoreWatcher(cartStore: any) {
  watch(
    () => cartStore.counter,
    (newCounter) => {
      localStorage.setItem('counter', JSON.stringify(newCounter))
    }
  )

  watch(
    () => cartStore.totalAmountCart,
    (newTotalAmountCart) => {
      localStorage.setItem('totalAmountCart', JSON.stringify(newTotalAmountCart))
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
