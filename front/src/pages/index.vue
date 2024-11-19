<template>
  <loading :loading/>
  <v-container>
    <div class="mt-10 d-flex justify-center">
      <login-card-form
        :email
        :password
        @update:email="email = $event"
        @update:password="password = $event"
      >
        <v-btn
          class="w-100 bg-orange"
          size="large"
          :disabled="!email || !password"
          @click="handleLogin"
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
import { EventBus } from "@/plugins/event-bus";

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
    }
  },
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin(email: string, password: string) {
      this.loading = true;

      try {
        await this.authStore.login({
          email,
          password,
        })

        await this.router.push("/dashboard");
      } catch (error) {
        const treatedError = getError(error, "Erro ao fazer login");
        EventBus.$emit("toast", {
          title: treatedError.title,
          text: treatedError.message,
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
