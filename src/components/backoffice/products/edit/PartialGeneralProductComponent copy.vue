<template>
    <v-main class="d-flex justify-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <p>General</p>
            <form>
              <v-text-field
                v-model="state.name"
                :error-messages="v$.name.$errors.map(e => e.$message)"
                :counter="10"
                label="Name"
                required
                @input="v$.name.$touch"
                @blur="v$.name.$touch"
              ></v-text-field>

              <v-text-field
                v-model="state.email"
                :error-messages="v$.email.$errors.map(e => e.$message)"
                label="E-mail"
                required
                @input="v$.email.$touch"
                @blur="v$.email.$touch"
              ></v-text-field>

              <v-select
                v-model="state.select"
                :items="items"
                :error-messages="v$.select.$errors.map(e => e.$message)"
                label="Item"
                required
                @change="v$.select.$touch"
                @blur="v$.select.$touch"
              ></v-select>

              <v-checkbox
                v-model="state.checkbox"
                :error-messages="v$.checkbox.$errors.map(e => e.$message)"
                label="Do you agree?"
                required
                @change="v$.checkbox.$touch"
                @blur="v$.checkbox.$touch"
              ></v-checkbox>

              <v-btn
                class="me-4"
                @click="v$.$validate"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script setup lang="ts">

  import { onMounted } from 'vue'
  import { useRoute  } from 'vue-router'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  import GetProductService from '@app/backoffice/products/application/find/GetProductService'
  import ErrorHandlingService from '@app/shared/application/ErrorHandlingService';

  interface InitialState {
    name: string;
    email: string;
    select: null | string;
    items: string[];
    checkbox: null | string;
  }

  const route = useRoute();
  const errorHandling = new ErrorHandlingService()
  
  const initialState: InitialState = {
    name: '',
    email: '',
    select: null,
    items: [],
    checkbox: null,
  }

  const state: InitialState = reactive({
    ...initialState,
  })

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

  const rules = {
    name: { required },
    email: { required, email },
    select: { required },
    items: { required },
    checkbox: { required },
  }

  const v$ = useVuelidate(rules, state)

  function clear() {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }

  onMounted(async () => {
    try {
        await getProductData();
    } catch (error: any) {
      errorHandling.handleApiError(error);
    }
  });

  const getProductData = async (): Promise<void> => {
    try {
        const productId: string[] | string  = route.params.productId;
        const getProductsListService = new GetProductService();
        const response = await getProductsListService.getApiResponse(productId); 
        console.log(response.productList.name);
    } catch(error) {
        console.log(error);
    }
  }

</script>