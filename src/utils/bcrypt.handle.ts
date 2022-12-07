import { compare, hash } from "bcryptjs"

/**
 * Encrypt password
 * @param pass plain text password 
 * @returns 
 */
const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 8)
  return passwordHash
}

/**
 * Verify encrypted password
 * @param pass plain text password
 * @param passHash hash password
 * @returns 
 */
const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass,passHash)
  return isCorrect
}

export {encrypt, verified}