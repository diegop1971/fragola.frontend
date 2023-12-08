<template>
  <v-navigation-drawer>
    <v-card class="mx-auto" width="300" style="border-right: 1px solid #ccc;">
      <v-list>
        <router-link :to="{ name: 'dashboard' }" class="text-decoration-none text-light">
          <v-list-item prepend-icon="mdi-home"> 
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list-group value="Catalog">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-view-list">
                <v-list-item-title>Catalog</v-list-item-title>  
              </v-list-item>
            </template>

            <v-list-item
              v-for="([title, icon, route], i) in catalog"
              :key="i"
              :prepend-icon="icon"
            >
              <router-link :to="{ name: route }" class="text-decoration-none text-light">
                <v-list-item-title>{{ title }}</v-list-item-title>  
              </router-link>
            </v-list-item>
          </v-list-group>

        <v-list-group value="Settings">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-cog">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-group value="Actions">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
              >
              <v-list-item-title>Actions</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="([title, icon], i) in cruds"
              :key="i"
              :prepend-icon="icon"
            >
            <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
  export default {
    data: () => ({
      catalog: [
        ['Categories', 'mdi-chevron-double-right', 'categories'],
        ['Products', 'mdi-chevron-double-right', 'products'],
        ['Stock', 'mdi-chevron-double-right', 'stock'],

      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }),
  }
</script>

<style lang="scss" scoped>

  .v-list-item--nav .v-list-item-title {
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: normal;
      line-height: 1rem;
  }
  .v-list-item-title {
      hyphens: auto;
      overflow-wrap: normal;
      overflow: hidden;
      padding: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: normal;
      word-wrap: break-word;
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: 0.009375em;
      line-height: 1.5rem;
      text-transform: none;
  }
  * {
      padding: 0;
      margin: 0;
  }

  .v-list-item--link {
      cursor: pointer;
  }
  .v-list-item--variant-plain, .v-list-item--variant-outlined, .v-list-item--variant-text, .v-list-item--variant-tonal {
      background: transparent;
      color: inherit;
  }
  user agent stylesheet
  a:-webkit-any-link {
      color: -webkit-link;
      cursor: pointer;
  }
  .v-list-group__items {
      --indent-padding: calc(var(--parent-padding) + var(--list-indent-size));
  }
  .v-list-group--prepend {
      --parent-padding: calc(var(--indent-padding) + var(--prepend-width));
  }
  .v-list-group {
      --list-indent-size: 16px;
      --parent-padding: var(--indent-padding);
      --prepend-width: 40px;
  }
  .v-list--nav {
      --indent-padding: -8px;
  }
  .v-list {
      --indent-padding: 10px;
  }
  .v-list {
      overflow: auto;
      padding: 8px 0;
      position: relative;
      outline: none;
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
      border-style: solid;
      border-width: 0;
      box-shadow: 0px 0px 0px 0px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 0px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
      border-radius: 0;
      background: rgba(var(--v-theme-surface));
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  }

</style>
