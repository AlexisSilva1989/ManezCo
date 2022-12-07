export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export type IUserSecure = Omit<IUser, "password">