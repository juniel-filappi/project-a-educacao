import { type AxiosInstance } from "axios"
import { type Router } from "vue-router"
import { type AuthStore } from "@/stores/auth"

export const createResponseInterceptors = (api: AxiosInstance, router: Router, store: AuthStore) => {
  const interceptor = api.interceptors.response.use(
    response => response,
    async (error) => {
      const { response } = error

      /* Resposta vazia da API */
      if (!response) {
        return Promise.reject({
          message: "Resposta vazia da API: " + error,
          error,
        })
      }

      /* Se não for autorizado */
      if (response.status === 401) {
        api.interceptors.response.eject(interceptor)

        await router.push('/')
      }

      /* Mantém o retorno como promise */
      return Promise.reject(error)
    }
  )
}
