import { Response, NextFunction} from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { IUser } from 'src/interfaces/user.interface'
import { RequestExt } from '../interfaces/auth.interface'
import { handleHttp } from '../utils/error.handle'
import { verifyToken } from '../utils/jwt.handle'

/**
 * check user token
 * @param req 
 * @param res 
 * @param next 
 */
export const checkSession = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || ""
    const jwt = jwtByUser.split(" ").pop()
    const isValidJwt = verifyToken(`${jwt}`)

    if(isValidJwt === null){
      res.status(401).send("UNAUTHORIZED")
    }else{
      req.user = isValidJwt as unknown as JwtPayload
      next()
    }
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USER", error)
  }
}