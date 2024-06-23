import { compare, genSalt, hash } from "bcryptjs"
import type { User } from "@models"

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(10)
  return hash(password, salt)
}

export const checkPassword = async (user: User, password: string) =>
  compare(password, user.password)
