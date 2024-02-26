<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <div class="product-stock-summary">
            <v-card class="elevation-6">
              <v-card-title class="primary darken-2 white--text">
                <v-icon>mdi-information-outline</v-icon>
                <span class="ml-2">Resumen de Stock</span>
              </v-card-title>
              <v-card-text>
                <div v-if="product">
                  <p class="mb-2">
                    Nombre del Producto: <strong>{{ product.name }}</strong>
                  </p>
                  <p class="mb-2">
                    Stock Disponible: <strong>{{ product.stock }}</strong>
                  </p>
                  <p v-if="product.stock > 0" class="green--text">¡Producto disponible!</p>
                  <p v-else class="red--text">No hay stock disponible</p>
                </div>
                <div v-else>
                  <p>No se ha seleccionado ningún producto.</p>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from '@/types' // Supongamos que tienes un tipo definido para productos

export default defineComponent({
  name: 'ProductStockSummary',
  props: {
    product: {
      type: Object as () => Product | null,
      required: true
    }
  },
  setup(props) {
    return {
      product: props.product
    }
  }
})
</script>

<style scoped>
.product-stock-summary {
  margin-top: 20px;
}
</style>
