<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        :model-value="name"
        :error-messages="mapErrorsValidation(vuelidate.form.name.$errors)"
        label="Nome"
        outlined
        @input="vuelidate.form.name.$touch"
        @blur="vuelidate.form.name.$touch"
        @update:model-value="$emit('update:name', $event)"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :model-value="email"
        type="email"
        label="E-mail"
        outlined
        :error-messages="mapErrorsValidation(vuelidate.form.email.$errors)"
        @input="vuelidate.form.email.$touch"
        @blur="vuelidate.form.email.$touch"
        @update:model-value="$emit('update:email', $event)"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :model-value="ra"
        label="Registro Acadêmico"
        type="number"
        :disabled="haveId"
        :error-messages="mapErrorsValidation(vuelidate.form.ra.$errors)"
        outlined
        @input="vuelidate.form.ra.$touch"
        @blur="vuelidate.form.ra.$touch"
        @update:model-value="$emit('update:ra', $event)"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :model-value="mask.masked(cpf)"
        label="CPF"
        outlined
        :disabled="haveId"
        counter="14"
        :error-messages="mapErrorsValidation(vuelidate.form.cpf.$errors)"
        @update:model-value="$emit('update:cpf', mask.unmasked($event))"
        @input="vuelidate.form.cpf.$touch"
        @blur="vuelidate.form.cpf.$touch"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mask } from "maska"
import { mapErrorsValidation } from "@/utils/helpers";
import useVuelidate from "@vuelidate/core";

export default {
  name: "StudentForm",
  props: {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    ra: {
      type: String,
      default: "",
    },
    cpf: {
      type: String,
      default: "",
    },
    vuelidate: {
      type: Object,
      default: () => useVuelidate(),
    },
    haveId: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:name", "update:email", "update:ra", "update:cpf"],
  setup() {
    return {
      mask: new Mask({ mask: "###.###.###-##" }),
    };
  },
  methods: {
    mapErrorsValidation,
  },
};
</script>
