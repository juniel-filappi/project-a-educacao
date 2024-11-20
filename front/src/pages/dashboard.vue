<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <h2 class="pa-2">
        Módulo Acadêmico
      </h2>
      <router-link
        to="/dashboard"
        class="pa-2 d-flex bg-orange ga-4"
      >
        <v-icon>mdi-account-group</v-icon>
        <h3 class="text-white">
          Alunos
        </h3>
      </router-link>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="50"
        />
      </v-toolbar-title>

      <template #append>
        <v-btn @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Logo from "@/assets/logo-mais-a-educacao.svg"
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "Dashboard",
  components: {},
  setup() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
      logo: Logo,
    }
  },
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    logout() {
      this.authStore.logout()
      this.router.push('/');
    },
  },
}
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
