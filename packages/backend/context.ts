import {
  ItemsDataSource,
  LuggagesDataSource,
  RolesDataSource,
  TripsDataSource,
  UserTripsDataSource,
  UsersDataSource,
} from "@dataSources"
import type { Request, Response } from "express"
import { createJwtCookie, getJwtPayload } from "@utils"
import { Role, type User } from "@models"
import type { JwtPayload } from "jsonwebtoken"
import { GraphQLError } from "graphql"
import { Error } from "@enums"

export interface Context {
  dataSources: {
    users: UsersDataSource
    trips: TripsDataSource
    items: ItemsDataSource
    luggages: LuggagesDataSource
    roles: RolesDataSource
    userTrips: UserTripsDataSource
  }
  currentUser: User
  req: Request
  res: Response
}

export async function createContext(req: Request, res: Response) {
  const usersDataSource = new UsersDataSource()
  let user: User | null | Partial<User> = { roleId: -1 }
  if (req.cookies["sessionId"]) {
    const jwtPayload = getJwtPayload(req.cookies["sessionId"]) as JwtPayload

    user = await usersDataSource.getById(jwtPayload["userId"], {
      include: [Role],
    })

    if (!user) {
      res.clearCookie("sessionId")
      throw new GraphQLError(Error.USER_NOT_FOUND)
    }

    createJwtCookie(user as User, res)
  }

  return {
    dataSources: {
      users: usersDataSource,
      trips: new TripsDataSource(),
      userTrips: new UserTripsDataSource(),
      luggages: new LuggagesDataSource(),
      items: new ItemsDataSource(),
      roles: new RolesDataSource(),
    },
    currentUser: user,
    req,
    res,
  }
}
