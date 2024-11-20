<template>
  <v-card class="elevation-12 rounded-md pa-5">
    <v-card-title class="text-center">
      <h1 class="display-1 font-weight">
        Login
      </h1>
      <v-divider class="mt-5 bg-secondary" />
      <span class="font-weight-light">
        Começe digitando o seu email e a sua senha
      </span>
    </v-card-title>
    <v-card-text class="mt-10">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-text-field
          :model-value="email"
          :error="vuelidate.form.email.$dirty && vuelidate.form.email.$invalid"
          :error-messages="mapErrorsValidation(vuelidate.form.email.$errors)"
          max-errors="2"
          label="E-mail"
          required
          type="email"
          variant="outlined"
          autocomplete="email"
          @update:model-value="$emit('update:email', $event)"
          @blur="vuelidate.form.email.$touch()"
          @input="vuelidate.form.email.$touch()"
        />
        <v-text-field
          :model-value="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error="vuelidate.form.password.$dirty && vuelidate.form.password.$invalid"
          :error-messages="mapErrorsValidation(vuelidate.form.password.$errors)"
          max-errors="2"
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          required
          variant="outlined"
          autocomplete="current-password"
          @click:append="showPassword = !showPassword"
          @update:model-value="$emit('update:password', $event)"
          @blur="vuelidate.form.password.$touch()"
          @input="vuelidate.form.password.$touch()"
        />
      </v-form>
      <div class="text-end">
        <span>
          Não tem uma conta?
          <router-link
            to="/register"
            class="text-secondary"
          >
            Começe agora
          </router-link>
        </span>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { mapErrorsValidation } from '@/utils/helpers';
import useVuelidate from "@vuelidate/core";

export default {
  name: "LoginCardForm",
  props: {
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    vuelidate: {
      type: Object,
      default: () => useVuelidate(),
    },
  },
  emits: ["update:email", "update:password"],
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    mapErrorsValidation,
  }
};
</script>
