<template>
  <v-app>
    <v-container class="bg-surface-variant mb-6" style="display: flex; justify-content: center; align-items: center;">
      <v-app-bar>
        <v-app-bar-title>Dashboard</v-app-bar-title>
      </v-app-bar>
    </v-container>
    
    <v-container style="display: flex; justify-content: center; align-items: center;">
      <v-row justify="center">
        <v-col class="col-v-navigation" cols="2">
          <v-card >
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
                <template v-slot:append>
                  <div class="pa-2">
                    <v-btn block>
                      Logout
                    </v-btn>
                  </div>
                </template>
              </v-navigation-drawer>
              <v-main style="height: 400px;"></v-main>
            </v-layout>
          </v-card>
        </v-col>
        <v-col cols="10" margin="20">
          <main class="main-content">
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
          </main>
        </v-col>
      </v-row>
      <v-footer app position="fixed">
        <v-spacer></v-spacer>
        <span>Copyright © 2023</span>
      </v-footer>
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
  .v-col.col-v-navigation {
    border-bottom-style: none;
  }
  .col-v-navigation > .v-card {
      box-shadow: none;
  }
</style>