import { GraphQLError } from "graphql"
import { sign, verify, type JwtPayload } from "jsonwebtoken"
import { Error } from "@enums"
import type { User } from "@models"

const secret = process.env["JWT_KEY"] || "secret"

export const getJwtPayload = (token: string): string | JwtPayload => {
  try {
    return verify(token, secret)
  } catch (err) {
    throw new GraphQLError(Error.INVALID_TOKEN)
  }
}

export const createJwt = (user: User) => {
  return sign({ userId: user.id }, secret, { expiresIn: 60 * 60 * 24 })
}
