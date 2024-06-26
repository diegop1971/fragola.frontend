<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import ErrorHandlingService from '@app/shared/application/ErrorHandlingService'
import NumberFormatterService from '@app/shared/application/NumberFormatterService'
import CartProductRemoverService from '@app/frontoffice/cart/application/delete/CartProductRemoverService'
import CartProductsGetterService from '@app/frontoffice/cart/application/find/CartProductsGetterService'
import type { ISessionCartItem } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItem'
import { useCartStore } from '@/stores/cartStore'
import CartProductQuantityUpdaterService from '@app/frontoffice/cart/application/update/CartProductQuantityUpdaterService'
import type { ISessionCartItemResponse } from '@app/frontoffice/cart/domain/interfaces/ISessionCartItemResponse'
import useCartStoreWatcher from '@app/frontoffice/cart/infrastructure/persistence/cartStoreWatcher'

const errorHandling = new ErrorHandlingService()
const sessionCartItems: Ref<Array<ISessionCartItem>> = ref([])
const cartStore = useCartStore()
const cartTotalItemCount: Ref<ISessionCartItemResponse['cartTotalItemCount']> = ref(0)
const cartTotalAmount: Ref<ISessionCartItemResponse['cartTotalAmount']> = ref(0)

axios.defaults.withCredentials = true

onMounted(async (): Promise<void> => {
  try {
    useCartStoreWatcher(cartStore)
    await getCartData()
    cartStore.refreshQty(cartTotalItemCount.value)
    cartStore.refreshTotalCartValue(cartTotalAmount.value)
  } catch (error: any) {
    errorHandling.handleApiError(error)
  }
})

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
  } catch (error) {
    errorHandling.handleApiError(error)
  }
}

const updateQuantity = async (sessionCartItem: ISessionCartItem) => {
  sessionCartItem.productQty = Number(sessionCartItem.productQty)
  if (sessionCartItem.productQty < 1) {
    sessionCartItem.productQty = 1
  }
  await modifyCartItemQuantity(sessionCartItem.productId, sessionCartItem.productQty)
  cartStore.refreshQty(cartTotalItemCount.value)
  cartStore.refreshTotalCartValue(cartTotalAmount.value)
}

const modifyCartItemQuantity = async (productId: string, productQty: number) => {
  try {
    const updateCartItemQuantity = new CartProductQuantityUpdaterService(productId, productQty)
    await updateCartItemQuantity.update()
    await getCartData()
  } catch (error) {
    console.log(error)
  }
}

const onDeleteItem = async (index: number): Promise<void> => {
  try {
    const cartItemRemover = new CartProductRemoverService(index)
    await cartItemRemover.delete()
    await getCartData()
    cartStore.refreshQty(Number(cartTotalItemCount.value))
    cartStore.refreshTotalCartValue(cartTotalAmount.value)
    localStorage.setItem('cartItemCount', JSON.stringify(cartStore.cartItemCount))
  } catch (error) {
    console.log(error)
  }
}

const getProductUnitPrice = computed(() => {
  return (sessionCartItem: ISessionCartItem) => {
    return onFormatNumber(sessionCartItem.productUnitPrice)
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

function trimmedDescription(description: string): string {
  if (description.length <= 70) {
    return description
  }
  return description.substring(0, 150) + '...'
}
</script>

<template>
  <div class="cart-container">
    <div
      v-for="(sessionCartItem, key) in sessionCartItems"
      v-bind:key="sessionCartItem.productId"
      class="card-margin"
    >
      <v-card class="no-shadow rounded-card padded-card">
        <div class="card-content">
          <v-img
            class="product-image"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            height="160px"
            width="200px"
            max-width="200px"
            cover
          ></v-img>
          <div class="product-info" style="max-width: 350px">
            <div class="product-title">
              {{ sessionCartItem.productName }}
            </div>
            <div
              class="description-container"
              style="word-wrap: break-word; overflow-wrap: break-word"
            >
              {{ trimmedDescription(sessionCartItem.productDescription) }}
            </div>
            <div>$ {{ getProductUnitPrice(sessionCartItem) }}</div>
          </div>
          <div class="quantity-container">
            <v-text-field
              v-model="sessionCartItem.productQty"
              density="compact"
              style="width: 80px"
              type="number"
              variant="outlined"
              hide-details
              min="1"
              @change="updateQuantity(sessionCartItem)"
            ></v-text-field>
          </div>
          <div class="price-container">
            <div>
              $ {{ subtotal(sessionCartItem.productQty, sessionCartItem.productUnitPrice) }}
            </div>
          </div>
          <div class="delete-button-container">
            <v-card-actions>
              <v-btn delete-button icon v-on:click.prevent="onDeleteItem(key)">
                <v-icon style="margin-right: 10px">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-container {
  width: 865px;
  max-width: 865px;
  padding: 0 !important;
  margin-right: 30px;
}

.card-content {
  display: flex;
}

.no-shadow {
  border: 1px solid #c0c0c0;
  box-shadow: none;
}

.rounded-card {
  border-radius: 10px;
}

.padded-card {
  padding: 15px;
}

.card-margin {
  margin-bottom: 20px;
}

.product-image {
  width: 200px;
  height: 160px;
}

.product-title {
  font-size: 1.05rem;
  font-weight: 700;
  align-self: start;
}

.product-info {
  margin-left: 15px;
  align-self: start;
  flex-grow: 1;
}

.product-info div:last-child {
  font-size: 1.1rem;
  color: rgb(90, 90, 204);
  font-weight: bold;
}

.description-container {
  font-size: 1rem;
  color: gray;
}

.quantity-container {
  font-size: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 15px;
  margin-left: 20px;
}

.quantity-container input[type='number'] {
  margin-top: 1px;
  width: 35px;
}

.increment-btn,
.decrement-btn {
  background-color: #f8f9fa;
  color: #020202;
  font-size: 1.2rem;
  font-weight: 500;
  border: 1px solid #ced4da;
  cursor: pointer;
  width: 30px;
}

.increment-btn:hover,
.decrement-btn:hover {
  background-color: #e9ecef;
}

.increment-btn:active,
.decrement-btn:active {
  background-color: #dee2e6;
}

.price-container {
  font-size: 1.3rem;
  color: green;
  font-weight: 750;
  align-self: start;
  text-align: right;
  flex-grow: 1;
  margin-top: 15px;
  margin-right: 20px;
}

.v-card-actions {
  justify-content: center;
}

.v-card-actions button {
  font-size: 0.8rem;
  font-weight: 600;
}

.delete-button-container {
  position: absolute;
  right: 0;
  bottom: 0;
  align-self: flex-end;
}

.delete-button {
  margin-right: 25px;
}
</style>
