<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon> mdi-cart </v-icon>
        {{ cartStore.cartItemCount }} item(s) - $ {{ formatTotalCartAmount(cartStore.totalCartValue) }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Shopping Cart">
        <v-card-text>
          <div v-if="cartStore.cartItemsList.length === 0">
            <td colspan="6" class="text-center">
              <h3>Tu carrito está vacío</h3>
            </td>
          </div>
          <div v-else>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, key) in cartStore.cartItemsList" :key="product.productId">
                  <td>{{ product.productName }}</td>
                  <td>{{ product.productQty }}</td>
                  <td class="text-right border-bottom">
                    <p class="h6">$ {{ subtotal(product.productQty, product.productUnitPrice) }}</p>
                  </td>
                  <td>
                    <a href="cart.delete-item" v-on:click.prevent="onDeleteItem(key)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import NumberFormatterService from '@app/shared/application/NumberFormatterService'
import CartProductRemoverService from '@app/frontoffice/cart/application/delete/CartProductRemoverService'
import type { ISessionCartItem } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'

const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([])
const cartStore = useCartStore()
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0)
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0)

const formatTotalCartAmount = computed(() => {
  return (numero: number) => {
    const numberFormater = new NumberFormatterService()
    const numberFormated = numberFormater.formatNumber(numero)
    return numberFormated
  }
})

const subtotal = (qty: number, price: number): number => {
  let subtotal = qty * price
  let subtotalFormated = onFormatNumber(subtotal)
  return subtotalFormated
}

const onFormatNumber = (numberToFormat: number) => {
  let formattedNumber = new NumberFormatterService()
  return formattedNumber.formatNumber(numberToFormat)
}

const onDeleteItem = async (index: number): Promise<void> => {
  try {
    const cartItemRemover = await new CartProductRemoverService(index)
    await cartItemRemover.delete()
    await getCartData()
    cartStore.refreshQty(cartTotalItemCount.value)
    cartStore.refreshTotalCartValue(cartTotalAmount.value)
  } catch (error) {
    console.log(error)
  }
}

const getCartData = async (): Promise<void> => {
  try {
    const getCartProducts = new CartProductsGetterService()
    const response = await getCartProducts.getCartProductsList()

    sessionCartItems.value = response.sessionCartItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productDescription: item.productDescription,
      productQty: item.productQty,
      productUnitPrice: item.productUnitPrice,
      subtotal: item.productQty * item.productUnitPrice
    }))
    cartTotalItemCount.value = response.cartTotalItemCount
    cartTotalAmount.value = response.cartTotalAmount
    cartStore.refreshCartItems(response.sessionCartItems)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
table thead tr th {
  font-size: 0.95rem;
}

table tbody tr td {
  font-size: 0.9rem;
}

table thead tr th:nth-child(1) {
  text-align: left !important;
}

table thead tr th:nth-child(2) {
  text-align: center !important;
}

table thead tr th:nth-child(3) {
  text-align: right !important;
}

table thead tr th:nth-child(2) {
  text-align: center;
}

table tbody tr td:nth-child(2) {
  text-align: center;
}
table thead tr th:nth-child(3) {
  text-align: center;
}

table tbody tr td:nth-child(3) {
  text-align: center;
}
</style>
