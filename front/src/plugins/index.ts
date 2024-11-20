/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'
import install from "@/plugins/http";
import { useAuthStore } from "@/stores/auth";

export function registerPlugins (app: App) {
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
  install(useAuthStore(), router)
}
