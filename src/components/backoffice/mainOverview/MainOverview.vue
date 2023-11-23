<template>
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
</template>

<script lang="ts" setup>
  const title: string = 'Dashboard';
  const headers = [
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
                  ];
  
  const data = [
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
                ];

</script>