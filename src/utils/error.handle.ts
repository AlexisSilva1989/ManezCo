import { Response } from "express"

/**
 * http error handler
 * @param res 
 * @param error 
 */
const handleHttp = (res: Response, msg: string, errorRaw?: any) => {
  res.status(500).send({msg})
  console.log(errorRaw);
}

export { handleHttp }