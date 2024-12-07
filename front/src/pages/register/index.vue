<template>
  <loading :loading />
  <v-container>
    <div class="mt-10 d-flex justify-center">
      <register-card-form
        v-model:name="form.name"
        v-model:email="form.email"
        v-model:password="form.password"
        :vuelidate="v$"
        @register="handleRegister"
      >
        <v-btn
          class="w-100 bg-orange"
          size="large"
          :disabled="!v$.form.$dirty || v$.form.$invalid"
          @click="handleRegister"
        >
          Cadastrar
        </v-btn>
      </register-card-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import RegisterCardForm from "@/components/RegisterForm.vue";
import Loading from "@/components/Loading.vue";
import { getError } from "@/utils/error";
import { register } from "@/service/auth/service";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators"
import useToast from "@/composables/useToast";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  components: {
    Loading,
    RegisterCardForm,
  },
  setup() {
    return {
      toast: useToast(),
      router: useRouter(),
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
      }
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
        email: {
          required: helpers.withMessage("Campo obrigatório", required),
          email: helpers.withMessage("E-mail inválido", email),
        },
        password: {
          required: helpers.withMessage("Campo obrigatório", required),
          minLength: helpers.withMessage("Mínimo de 8 caracteres", minLength(8)),
        }
      }
    }
  },
  methods: {
    async handleRegister() {
      this.v$.form.$touch();
      if (this.v$.form.$invalid) {
        return;
      }

      this.v$.form.$reset();

      this.loading = true;
      try {
        await register(this.form);

        this.toast.success(
          "Cadastro realizado com sucesso",
          "Você será redirecionado para a página de login"
        );

        await this.router.push('/');
      } catch (error) {
        const treatedError = getError(error, "Erro ao fazer cadastro");

        this.toast.error(treatedError.title, treatedError.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
