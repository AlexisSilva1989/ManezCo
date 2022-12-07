import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import { IUser } from "./user.interface"

export interface IAuth {
  email: string
  password: string
}

export interface RequestExt extends Request {
  user?: JwtPayload
}