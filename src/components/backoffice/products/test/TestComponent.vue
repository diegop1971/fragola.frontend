<template>
  <v-main class="d-flex justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-sheet width="300" class="mx-auto">
            <v-form ref="form">
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <div class="d-flex flex-column">
                <v-btn color="success" class="mt-4" block @click="validate">Validate</v-btn>
                <v-btn color="error" class="mt-4" block @click="reset">Reset Form</v-btn>
                <v-btn color="warning" class="mt-4" block @click="resetValidation"
                  >Reset Validation</v-btn
                >
              </div>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Data properties
const name = ref('')
const nameRules = ref([
  (v: string) => !!v || 'Name is required',
  (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
])
const select = ref<string | null>(null)
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const checkbox = ref(false)

// Methods
const form = ref<any>(null) // Define a ref for the form

async function validate() {
  const { valid } = await form.value.validate()
  if (valid) alert('Form is valid')
}

function reset() {
  form.value.reset()
}

function resetValidation() {
  form.value.resetValidation()
}
</script>
