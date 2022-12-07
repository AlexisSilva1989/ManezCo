import { IUser } from "../interfaces/user.interface";
import { IAuth } from "../interfaces/auth.interface";
import { verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { findUserService } from "./user.service";

/**
 * User login
 * @param param Object with email and password 
 * @returns Object with token and data user
 */
export const loginUser = async ({ email, password }: IAuth) => {
  const user: IUser = findUserService({ email })

  if (!user) return { code: 403, data: "INCORRECT_CREDENTIALS" } //NOT_FOUND__USER

  const isCorrectPass = await verified(password, user.password)

  if (!isCorrectPass) return { code: 403, data: "INCORRECT_CREDENTIALS" }

  const token = await generateToken(user.email)
  const data = { token, user }

  return { code: 200, data: data }
} 