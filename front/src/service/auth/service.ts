import { http } from "@/plugins/http";
import type { IResponseUserLogged } from "@/service/auth/interface";

export async function loginUser(email: string, password: string): Promise<IResponseUserLogged> {
  const { data } = await http.post<IResponseUserLogged>("/auth/login", {
    email,
    password,
  })

  return data
}

export async function testTokenValid(): Promise<boolean> {
  const { data } = await http.get("/auth/me")

  return !(data && !data.success)
}
