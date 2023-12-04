<template>
    <v-main class="d-flex justify-center" style="min-height: 300px;">
        <v-container>
            <v-row justify="center">
                <v-col cols="12">
                    <v-card>
                        <v-toolbar color="primary">
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>

                            <v-toolbar-title>Categories</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>

                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>

                            <template v-slot:extension>
                                <v-tabs v-model="model" centered>
                                    <v-tab v-for="(item, index) in items" :key="index" :value="item.value">
                                        {{ item.label }}
                                    </v-tab>
                                </v-tabs>
                            </template>
                        </v-toolbar>

                        <v-window v-model="model">
                        <v-window-item v-for="(item, index) in items" :key="index" :value="item.value">
                            <v-card>
                                <v-card-text>{{ item.text }}</v-card-text>
                            </v-card>
                        </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script lang="ts">
export default {
  data() {
    return {
      model: 'tab-2',
      items: [
        { value: 'tab-1', label: 'Item 1', text: 'Texto para el Item 1' },
        { value: 'tab-2', label: 'Item 2', text: 'Texto para el Item 2' },
        { value: 'tab-3', label: 'Item 3', text: 'Texto para el Item 3' }
      ]
    };
  }
};
</script>