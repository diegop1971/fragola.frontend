<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" margin="20">
          <main class="main-content">
            <v-row>
              <v-col
                v-for="n in 18"
                :key="n"
                class="d-flex child-flex"
                cols="3"
              >
                <v-container fluid class="text-center">
                  <!-- Inicio del enlace -->
                  <a :href="`https://vuetifyjs.com/product/${n}`" class="text-decoration-none">
                    <!-- Contenido dentro del enlace -->
                    <div>
                      <!-- Imagen -->
                      <v-img
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2"
                        height="300"
                        max-height="300"
                      >
                        <template v-slot:placeholder>
                          <!-- ... -->
                        </template>
                      </v-img>
                      
                      <!-- Descripción, reseñas, precio, botón, etc. -->
                      <p class="mt-2 text-description" style="font-size: 14px">Descripción corta del producto {{ n }}</p>
                      <div class="d-flex justify-center align-center flex-wrap" style="font-size: 12px">
                        <div class="d-flex align-center mr-1 text-review">
                          <span>{{ Math.floor(Math.random() * 50) }} reseñas</span>
                          <v-icon class="star-icon" style="font-size: 14px">mdi-star</v-icon>
                        </div>
                        <div style="font-family: 'Arial', sans-serif; color: #666;">
                          Tienda: Nombre de la tienda
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-center">
                          <span class="price-bold" style="font-size: 18px">USD 1,99</span>
                          <span class="price-discount" style="font-size: 14px"> - USD 2,85 (30% de descuento)</span>
                        </p>
                      </div>
                      <v-btn
                        color="primary"
                        class="mt-1"
                        font-size="16px"
                        block
                      >
                        Add to cart
                      </v-btn>
                    </div>
                    <!-- Fin del contenido dentro del enlace -->
                  </a>
                  <!-- Fin del enlace -->
                </v-container>
              </v-col>
            </v-row>
          </main>
        </v-col>
      </v-row>

      <v-footer app position="fixed">
        <v-spacer></v-spacer>
        <!-- ... -->
      </v-footer>
    </v-container>
  </v-app>
</template>

<style lang="scss">
.price-bold {
  font-weight: bold;
  font-size: 20px;
  color: #1b5e20; /* Verde oscuro */
}

.price-discount {
  font-size: 16px;
  color: #616161; /* Gris */
}

.text-description {
  color: #333; /* Cambia el color del texto de la descripción */
}

.text-review {
  color: #333; /* Cambia el color del texto de las reseñas */
}

.star-icon {
  color: #333; /* Cambia el color de la estrella */
}

</style>

<script lang="ts">
export default {
  data() {
  }
};
</script>
