export interface IUserMe {
  id: number
  email: string
  name: string
}

export interface IResponseUserLogged {
  user: IUserMe
  access_token: string
}
