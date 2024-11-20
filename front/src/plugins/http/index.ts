import axios, { type AxiosInstance } from "axios"
import { createResponseInterceptors } from "@/plugins/http/interceptors"
import type { AuthStore } from "@/stores/auth";
import { type Router } from 'vue-router'

export let http: AxiosInstance

export function createInstance() {
  if (!http) {
    http = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {"X-Application-Piperun": "CRM_Web_VueJs"},
    })
  }

  return http
}

/**
 * Helper method to set the header with the token
 */
export function setToken(token: string) {
  http.defaults.headers.common.Authorization = token
}

export default function install(store: AuthStore, router: Router) {
  createInstance()
  createResponseInterceptors(http, router, store)
}
