<template>
  <v-app>
    <v-container class="bg-surface-variant mb-6" justify="center" align="center">
      <v-row justify="center">
        <v-col>
          <v-app-bar app class="mx-auto" style="width: 100%;">
            <v-container>
              <v-row justify="center">
                <v-col cols="2">
                  <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-app-bar-title>
                    Navbar
                  </v-app-bar-title>
                </v-col>
                <v-col cols="2">
                  <v-btn icon>
                    <v-icon>mdi-bell</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-app-bar>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="bg-surface-variant mb-6" style="display: flex; justify-content: center; align-items: center;">
      <v-row>
        <v-col cols="12" lg="8" style="width: 100%;">
          <v-card class="mx-auto" style="width: 100%; min-width: 600px;">
            <v-card-title>
              <v-text-field label="Título del panel" v-model="title"></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <v-icon>mdi-chart-line</v-icon> Gráfico de ventas
                    </v-card-title>
                    <v-card-text>
                      <canvas id="chart"></canvas>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <v-icon>mdi-table</v-icon> Tabla de clientes
                    </v-card-title>
                    <v-card-text>
                      <v-data-table :headers="headers" :items="data"></v-data-table>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script lang="ts">
export default {
  data() {
    return {
      title: 'Dashboard',
      headers: [
        {
          text: 'Nombre',
          value: 'name',
        },
        {
          text: 'Correo electrónico',
          value: 'email',
        },
        {
          text: 'Teléfono',
          value: 'phone',
        },
      ],
      data: [
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '123-456-7890',
        },
        {
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          phone: '987-654-3210',
        },
      ],
    };
  },
};
</script>

<style scoped lang="css">
/* ... tus estilos ... */
</style>
