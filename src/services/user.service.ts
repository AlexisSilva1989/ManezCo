import { v4 as uuid } from "uuid"
import { IUser } from "../interfaces/user.interface"
import { getConnection } from "../config/jsondatabase"
import { IResponseService } from "../interfaces/common.interface"
import { encrypt } from "../utils/bcrypt.handle"

export const findUserService = (filter: Object): IUser => {
  return getConnection().get('users').find(filter).value() as IUser
}

export const getUsersService = (): IUser[] => {
  return getConnection().get('users').value()
}

export const countUsersService = (): number => {
  return getConnection().get('users').value().length
}

export const getUserService = (filter: Object): IResponseService => {
  const user: IUser = findUserService(filter)

  if (!user) return { code: 404, data: "NOT_FOUND_USER" }

  return { code: 200, data: user }
}

export const createUserService = async (data: IUser): Promise<IResponseService> => {

  const { name, email, password } = data

  const user: IUser = findUserService({ email })

  if (user) return { data: "ALREADY_USER" }

  const passHash: string = await encrypt(password);
  const newUser: IUser = {
    id: uuid(),
    name,
    email,
    password: passHash,
  }

  getConnection().get('users').push(newUser).write()

  return { data: newUser }
}

export const updateUserService = async (id: string, body: IUser): Promise<IResponseService> => {

  const user: IUser = findUserService({ id })

  if (!user) return { code: 404, data: "NOT_FOUND_USER" }

  const passHash: string = await encrypt(body.password)
  body.password = passHash

  getConnection().get('users').find({ id }).assign(body).write()

  return { data: user }
}

export const deleteUserService = (filter: Object): IResponseService => {
  const user: IUser = findUserService(filter)

  if (!user) return { code: 404, data: "NOT_FOUND_USER" }

  getConnection().get('users').remove(filter).write()

  return { code: 200, data: user }
}
