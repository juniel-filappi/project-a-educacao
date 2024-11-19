import { defineStore } from "pinia"
import { loginUser, testTokenValid } from "@/service/auth/service"
import storage from "@/utils/storage"
import { type IUserMe } from "@/service/auth/interface"
import { setToken } from "@/plugins/http"

export interface LoginRequest {
  email: string
  password: string
}

export interface IStateAuth {
  user: IUserMe
  access_token: string
}

export const useAuthStore = defineStore("auth", {
  state: (): IStateAuth => ({
    user: {} as IUserMe,
    access_token: "",
  }),
  getters: {
    hasToken(): boolean {
      return Boolean(this.access_token)
    },
  },
  actions: {
    init() {
      this.user = storage.get("user") ? JSON.parse(storage.get("user") as string) : {}
      this.access_token = storage.get("access_token") || ""

      if (this.access_token) {
        setToken(`Bearer ${this.access_token}`)
      }
    },
    async saveTokens(access_token: string) {
      this.access_token = access_token

      await storage.set("access_token", access_token)

      setToken(`Bearer ${access_token}`)
    },
    async login(data: LoginRequest) {
      const { user, access_token } = await loginUser(data.email, data.password)

      await this.saveTokens(access_token)

      await storage.set("user", user)
      this.user = user
    },
    async logout() {
      await storage.set("user", null)
      await storage.set("access_token", null)

      this.user = {} as IUserMe
      this.access_token = ""
    },
    async userAuthStatus() {
      if (this.access_token) {
        if (await testTokenValid()) {
          return true
        }
      }

      await this.logout()

      return false
    },
  },
})

export type AuthStore = ReturnType<typeof useAuthStore>
