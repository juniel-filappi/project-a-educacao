<template>
  <loading :loading />
  <v-container>
    <div class="mt-10 d-flex justify-center">
      <login-card-form
        v-model:email="form.email"
        v-model:password="form.password"
        :vuelidate="v$"
      >
        <v-btn
          class="w-100 bg-orange"
          size="large"
          @click="handleLogin"
          @keyup.enter="handleLogin"
        >
          Entrar
        </v-btn>
      </login-card-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import LoginCardForm from "@/components/LoginForm.vue";
import Loading from "@/components/Loading.vue";
import { getError } from "@/utils/error";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import useToast from "@/composables/useToast";

export default {
  name: "Login",
  components: {
    Loading,
    LoginCardForm,
  },
  setup() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
      toast: useToast(),
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: "",
      }
    };
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage("Campo obrigatório", required),
          email: helpers.withMessage("E-mail inválido", email),
        },
        password: {
          required: helpers.withMessage("Campo obrigatório", required),
          minLength: helpers.withMessage("Senha deve ter no mínimo 8 caracteres", minLength(8)),
        }
      }
    }
  },
  methods: {
    async handleLogin() {
      this.v$.form.$touch();
      if (this.v$.form.$error) {
        this.toast.error("Erro ao fazer login", "Preencha os campos corretamente");

        return;
      }

      this.v$.form.$reset()

      this.loading = true;

      try {
        await this.authStore.login(this.form)

        await this.router.push("/dashboard");
      } catch (error) {
        const treatedError = getError(error, "Erro ao fazer login");

        this.toast.error(treatedError.title, treatedError.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
