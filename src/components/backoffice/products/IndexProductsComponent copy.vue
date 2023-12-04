<template>
  <v-main class="d-flex justify-center" style="min-height: 300px;">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-data-table :headers="headers" :items="vegetables">
            <template v-slot:item.calories="{ value }">
              <v-chip :color="getColor(value)">
                {{ value }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
export default {
    data: () => ({
      headers: [
        { title: 'Vegetable (100g serving)', key: 'name' },
        { title: 'Calories', key: 'calories' },
        { title: 'Fat (g)', key: 'fat' },
        { title: 'Carbs (g)', key: 'carbs' },
        { title: 'Protein (g)', key: 'protein' },
        { title: 'Iron (%)', key: 'iron' },
        { title: 'Actions', key: 'actions', align: 'center' } // Nueva columna para acciones
      ],

      vegetables: [
        {
          name: 'Spinach',
          calories: 23,
          fat: 0.4,
          carbs: 3.6,
          protein: 2.9,
          iron: '15%',
        },
        {
          name: 'Kael',
          calories: 49,
          fat: 0.9,
          carbs: 8.8,
          protein: 4.3,
          iron: '16%',
        },
        {
          name: 'Broccoli',
          calories: 34,
          fat: 0.4,
          carbs: 6.6,
          protein: 2.8,
          iron: '6%',
        },
        
      ],
    }),

    methods: {
        getColor(calories: number) {
          if (calories > 100) return 'red';
          else if (calories > 50) return 'orange';
          else return 'green';
        },
        editItem(item: string) {
          // Lógica para editar el ítem
          console.log('Editar:', item);
        },
        deleteItem(item: string) {
          // Lógica para eliminar el ítem
          console.log('Eliminar:', item);
        },
      },
  }
</script>