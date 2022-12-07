import { JwtPayload, sign, verify } from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET || ""

/**
 * Generate token session
 * @param id for token
 * @returns token jwt
 */
export const generateToken = async (id: string) => {
  const jwt = await sign({ id }, JWT_SECRET, {
    expiresIn: "2h"
  })
  return jwt
}

/**
 * Verify token sesion
 * @param jwt token user
 * @returns token validity
 */
export const verifyToken = (jwt: string) => {
  const JwtValiddate: number | string | JwtPayload | undefined | void = verify(jwt, JWT_SECRET, (err, user) => {
    if (err) { return null }
    return user
  })

  return JwtValiddate
}