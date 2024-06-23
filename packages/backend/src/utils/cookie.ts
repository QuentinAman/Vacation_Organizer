import type { Response } from "express"
import type { User } from "@models"
import { createJwt } from "@utils"

export const createJwtCookie = (user: User, res: Response) => {
  const jwt = createJwt(user)
  res.cookie("sessionId", jwt, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    secure: true,
    sameSite: "none",
  })
}
