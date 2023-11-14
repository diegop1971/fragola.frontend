<template>
  <v-app>
    <v-container class="bg-surface-variant mb-6" style="display: flex; justify-content: center; align-items: center;">
      <v-app-bar>
        <v-app-bar-title>Dashboard</v-app-bar-title>
      </v-app-bar>
    </v-container>
    
    <v-container style="display: flex; justify-content: center; align-items: center;">
      <v-row justify="center" align="center">
        <v-col class="col-v-navigation" cols="2">
          <v-card>
            <v-layout>
              <v-navigation-drawer
                class="bg-deep-purple"
                theme="dark"
                permanent
              >
                <v-list color="transparent">
                  <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
                  <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
                  <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
                </v-list>
                <v-btn class="mi-boton-custom">Mi Botón Personalizado</v-btn>
                <template v-slot:append>
                  <div class="pa-2">
                    <v-btn block>
                      Logout
                    </v-btn>
                  </div>
                </template>
              </v-navigation-drawer>
              <v-main style="height: 400px"></v-main>
            </v-layout>
          </v-card>
        </v-col>
        <v-col cols="10" margin="20">
          <v-card>
            <v-card-title>
              <v-text-field label="Título del panel" v-model="title" ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>
                        <v-icon>mdi-chart-line</v-icon>
                        Gráfico de ventas
                      </v-card-title>
                      <v-card-text>
                        <canvas id="chart"></canvas>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center" >
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>
                        <v-icon>mdi-table</v-icon>
                        Tabla de clientes
                      </v-card-title>
                      <v-card-text>
                        <v-data-table
                          :headers="headers"
                          :items="data"
                        ></v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
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

<style lang="scss" scoped>
  /* Importa los estilos de Vuetify */
  
  /* Tu propio código de estilos personalizados */
  /* Define tu color de fondo personalizado */
  $mi-color-custom: #ff6347;

  /* Estilos personalizados para el botón */
  .v-btn.mi-boton-custom {
    /* Aplica el color de fondo personalizado */
    background-color: $mi-color-custom;
    color: white; /* Cambia el color del texto */
  }

  .v-col.col-v-navigation {
    height: 100%;
    display: flex;
    align-items: stretch;
  }
</style>