<template>
  <v-app>
    <v-main>
       <Toast />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Toast from "@/components/Toast.vue";
</script>
