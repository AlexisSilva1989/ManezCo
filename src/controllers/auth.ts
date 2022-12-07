import { Request, Response } from "express"
import { IResponseService } from "../interfaces/common.interface"
import { handleHttp } from "../utils/error.handle"
import { loginUser } from "../services/auth"

export const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body
    const response: IResponseService = await loginUser({ email, password })
    res.status(response.code || 200 ).json(response.data)
  } catch (error) {
    handleHttp(res, "ERROR_LOGIN_USER", error)
  }
}