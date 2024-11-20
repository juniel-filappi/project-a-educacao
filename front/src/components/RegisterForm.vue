<template>
  <v-card class="elevation-12 rounded-md pa-5">
    <v-card-title class="text-center">
      <h1 class="display-1 font-weight">
        Cadastre-se
      </h1>
      <v-divider class="mt-5 bg-secondary" />
      <span class="font-weight-light">
        Preencha os campos abaixo para continuar
      </span>
    </v-card-title>
    <v-card-text class="mt-10">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          :model-value="name"
          :error="vuelidate.form.name.$invalid"
          :error-messages="vuelidate.form.name.$errors?.map(error => error.$message)"
          max-errors="2"
          label="Nome Completo"
          required
          variant="outlined"
          @blur="vuelidate.form.name.$touch()"
          @update:model-value="$emit('update:name', $event)"
        />
        <v-text-field
          :model-value="email"
          :error="vuelidate.form.email.$invalid"
          :error-messages="vuelidate.form.email.$errors?.map(error => error.$message)"
          max-errors="2"
          label="E-mail"
          required
          type="email"
          autocomplete="off"
          variant="outlined"
          @blur="vuelidate.form.email.$touch()"
          @update:model-value="$emit('update:email', $event)"
        />
        <v-text-field
          :model-value="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :error="vuelidate.form.password.$invalid"
          :error-messages="vuelidate.form.password.$errors?.map(error => error.$message)"
          max-errors="2"
          label="Senha"
          required
          variant="outlined"
          autocomplete="off"
          @blur="vuelidate.form.password.$touch()"
          @click:append="showPassword = !showPassword"
          @update:model-value="$emit('update:password', $event)"
        />
      </v-form>
      <div class="text-end">
        <span>
          Possui uma conta?
          <router-link
            replace
            to="/"
            class="text-secondary"
          >
            Faça o login
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
import useVuelidate from "@vuelidate/core";

export default {
  name: "RegisterForm",
  props: {
    name: {
      type: String,
      default: "",
    },
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
  emits: ["update:name", "update:email", "update:password"],
  data() {
    return {
      showPassword: false,
      valid: false,
    };
  },
};
</script>
