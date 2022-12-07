import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { IResponseService } from "../interfaces/common.interface"
import {
  countUsersService, createUserService, deleteUserService,
  getUserService, getUsersService, updateUserService
} from "../services/user.service"

export const getUsers = ({ body }: Request, res: Response) => {
  try {
    res.json(getUsersService())
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS", error)
  }
}

export const createUsers = async (req: Request, res: Response) => {
  try {
    const response: IResponseService = await createUserService(req.body)
    res.status(response.code || 200).json(response.data)
  } catch (error) {
    handleHttp(res, "ERROR_POST_USER", error)
  }
}

export const countUsers = ({ body }: Request, res: Response) => {
  try {
    res.json(countUsersService())
  } catch (error) {
    handleHttp(res, "ERROR_COUNT_USER", error)
  }
}

export const getUser = async ({ params }: Request, res: Response) => {
  try {
    const response: IResponseService = await getUserService({ id: params.id })
    res.status(response.code || 200).json(response.data)
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER", error)
  }
}

export const updateUser = async ({ params, body }: Request, res: Response) => {
  try {
    const response: IResponseService = await updateUserService(params.id, body)
    res.status(response.code || 200).json(response.data)

  } catch (error) {
    handleHttp(res, "ERROR_POST_USER", error)
  }
}

export const deleteUser = async ({ params }: Request, res: Response) => {
  try {
    const response: IResponseService = await deleteUserService({ id: params.id })
    res.status(response.code || 200).json(response.data)
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USER", error)
  }
}
